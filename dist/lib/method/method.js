"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.Get = exports.useRunTimeInterceptor = void 0;
const service_1 = require("../ioc/service");
const core_1 = require("../core");
function useRunTimeInterceptor(Interceptor, time, options) {
    if (Interceptor) {
        if (Interceptor[time]) {
            Interceptor[time](options.req, options.res);
        }
    }
}
exports.useRunTimeInterceptor = useRunTimeInterceptor;
/**
 * @Params Method Like GET POST
 */
const createMethod = (method) => {
    return (URL) => {
        return function (target, propertyKey, descriptor) {
            const fn = descriptor.value;
            core_1.ref.def(propertyKey, URL, target.constructor.prototype, ":url");
            descriptor.value = async function (req, res) {
                target.constructor.prototype[propertyKey] = fn;
                // AOP Interceptor
                const interceptor = core_1.ref.get(propertyKey, target.constructor.prototype, ":interceptor");
                if (!req.closed) {
                    await useRunTimeInterceptor(interceptor, "before", { req, res });
                }
                // AOP Pipe
                const pipe = core_1.ref.get(propertyKey, target.constructor.prototype, ":pipe");
                if (pipe && !req.closed) {
                    const isNext = await pipe.run(req, res);
                    if (isNext) {
                        return;
                    }
                }
                console.log("req.closed useRuntime", req.closed);
                req.closed ||
                    (await useRunTimeInterceptor(interceptor, "hack", {
                        req,
                        res,
                    }));
                // run server
                if (!req.closed) {
                    const ret = await target.constructor.prototype[propertyKey](req, res);
                    res.json(ret);
                }
                // unMounted
                if (req.closed) {
                    await useRunTimeInterceptor(interceptor, "after", {
                        req,
                        res,
                    });
                }
                return;
            };
            service_1.SerivceMap.set(URL, {
                fn: descriptor.value,
                method,
            });
        };
    };
};
const Get = createMethod("Get");
exports.Get = Get;
const Post = createMethod("Post");
exports.Post = Post;
//# sourceMappingURL=method.js.map