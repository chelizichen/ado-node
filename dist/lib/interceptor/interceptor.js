"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseInterceptor = void 0;
const ioc_1 = require("../ioc");
/**
 * @description 使用路由拦截器
 */
const UseInterceptor = (fn) => {
    return function (target, propertyKey) {
        ioc_1.ref.def(propertyKey, fn, target.constructor.prototype, ":interceptor");
    };
};
exports.UseInterceptor = UseInterceptor;
//# sourceMappingURL=interceptor.js.map