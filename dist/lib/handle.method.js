"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.Get = void 0;
const handle_service_1 = __importDefault(require("./handle.service"));
/**
 * @Prarams Method Like GET POST
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
            handle_service_1.default.set(URL, {
                fn: descriptor.value,
                method,
            });
        };
    };
};
exports.Get = createMethod("Get");
exports.Post = createMethod("Post");
//# sourceMappingURL=handle.method.js.map