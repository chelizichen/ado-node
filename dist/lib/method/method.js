"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.All = exports.Post = exports.Get = exports.useRunTimeInterceptor = void 0;
const service_1 = require("../ioc/service");
const ioc_1 = require("../ioc");
function useRunTimeInterceptor(Interceptor, time, options) {
    if (Interceptor) {
        if (Interceptor[time]) {
            return Interceptor[time](options.req);
        }
    }
    return undefined;
}
exports.useRunTimeInterceptor = useRunTimeInterceptor;
function useArgs(propertyKey, target, req, res) {
    const hasQuery = ioc_1.ref.get(propertyKey, target.constructor.prototype, ":query");
    const hasBody = ioc_1.ref.get(propertyKey, target.constructor.prototype, ":body");
    const hasParams = ioc_1.ref.get(propertyKey, target.constructor.prototype, ":params");
    const hasHeaders = ioc_1.ref.get(propertyKey, target.constructor.prototype, ":headers");
    const hasRequest = ioc_1.ref.get(propertyKey, target.constructor.prototype, ":request");
    const hasResponse = ioc_1.ref.get(propertyKey, target.constructor.prototype, ":response");
    let arg = [];
    if (typeof hasQuery === "number" ||
        typeof hasBody === "number" ||
        typeof hasHeaders === "number" ||
        typeof hasRequest == "number" ||
        typeof hasResponse == "number" ||
        typeof hasParams == "number") {
        arg[hasQuery] = req.query;
        arg[hasBody] = req.body;
        arg[hasParams] = req.params;
        arg[hasHeaders] = req.headers;
        arg[hasRequest] = req;
        arg[hasResponse] = res;
        return arg;
    }
    return [req, res];
}
/**
 * @Params Method Like GET POST
 */
const createMethod = (method) => {
    return (URL) => {
        return function (target, propertyKey, descriptor) {
            const fn = descriptor.value;
            ioc_1.ref.def(propertyKey, URL, target.constructor.prototype, ":url");
            descriptor.value = async function (req, res) {
                target.constructor.prototype[propertyKey] = fn;
                // AOP Interceptor
                const interceptor = ioc_1.ref.get(propertyKey, target.constructor.prototype, ":interceptor");
                const before_data = await useRunTimeInterceptor(interceptor, "before", {
                    req,
                });
                console.log(before_data);
                if (before_data) {
                    return before_data;
                }
                // AOP Pipe
                const pipe = ioc_1.ref.get(propertyKey, target.constructor.prototype, ":pipe");
                if (pipe) {
                    const pipe_data = await pipe.run(req);
                    if (pipe_data) {
                        return pipe_data;
                    }
                }
                const hack_data = await useRunTimeInterceptor(interceptor, "hack", {
                    req,
                });
                if (hack_data) {
                    return hack_data;
                }
                const args = useArgs(propertyKey, target, req, res);
                const ret = await target.constructor.prototype[propertyKey](...args);
                if (ret && interceptor && interceptor.after) {
                    return {
                        data: ret,
                        after: interceptor.after,
                    };
                }
                if (ret && !interceptor) {
                    return {
                        data: ret,
                    };
                }
                return {
                    msg: "ok",
                    code: 0,
                };
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
const All = createMethod("All");
exports.All = All;
//# sourceMappingURL=method.js.map