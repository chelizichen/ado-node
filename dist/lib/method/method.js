"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.Get = exports.useRunTimeInterceptor = void 0;
const service_1 = require("../ioc/service");
const core_1 = require("../core");
function useRunTimeInterceptor(Interceptor, time, options) {
    if (Interceptor) {
        if (Interceptor[time]) {
            return Interceptor[time](options.req);
        }
    }
    return undefined;
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
                const before_data = await useRunTimeInterceptor(interceptor, "before", {
                    req,
                });
                if (before_data) {
                    return before_data;
                }
                // AOP Pipe
                const pipe = core_1.ref.get(propertyKey, target.constructor.prototype, ":pipe");
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
                const hasQuery = core_1.ref.get(propertyKey, target.constructor.prototype, ":query");
                const hasBody = core_1.ref.get(propertyKey, target.constructor.prototype, ":body");
                const hasHeaders = core_1.ref.get(propertyKey, target.constructor.prototype, ":headers");
                const hasRequest = core_1.ref.get(propertyKey, target.constructor.prototype, ":request");
                const hasResponse = core_1.ref.get(propertyKey, target.constructor.prototype, ":response");
                if (typeof hasQuery === "number" ||
                    typeof hasBody === "number" ||
                    typeof hasHeaders === "number" ||
                    typeof hasRequest == "number" ||
                    typeof hasResponse == "number") {
                    // const arguments = [req.query]
                    let arg = [];
                    arg[hasQuery] = req.query;
                    arg[hasBody] = req.body;
                    arg[hasHeaders] = req.headers;
                    arg[hasRequest] = req;
                    arg[hasResponse] = res;
                    const ret = await target.constructor.prototype[propertyKey](...arg);
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
                }
                else {
                    const ret = await target.constructor.prototype[propertyKey](req);
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
//# sourceMappingURL=method.js.map