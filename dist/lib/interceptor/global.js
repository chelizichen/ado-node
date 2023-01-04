"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseControllerInterceptor = void 0;
const ioc_1 = require("../ioc");
/**
 * @description 使用控制层拦截器
 */
const UseControllerInterceptor = (fn) => {
    return function (target) {
        ioc_1.ref.def(target.name, fn, target.prototype, ":ControllerInterceptor");
    };
};
exports.UseControllerInterceptor = UseControllerInterceptor;
//# sourceMappingURL=global.js.map