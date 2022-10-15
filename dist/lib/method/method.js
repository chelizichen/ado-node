"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.Get = void 0;
const service_1 = require("../ioc/service");
/**
 * @Params Method Like GET POST
 */
const createMethod = (method) => {
    return (URL) => {
        return function (target, propertyKey, descriptor) {
            const fn = descriptor.value;
            descriptor.value = async function (req, res) {
                target.constructor.prototype[propertyKey] = fn;
                await new Promise((resolve) => {
                    resolve(target.constructor.prototype[propertyKey](req, res));
                }).then((response) => {
                    res.json(response);
                });
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