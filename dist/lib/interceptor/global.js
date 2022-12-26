"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseControllerInterceptor = void 0;
// 整个路由匹配拦截
// 拦截器会在守卫之后执行
// 单独路由拦截
const ioc_1 = require("../ioc");
const UseControllerInterceptor = (fn) => {
    return function (target) {
        ioc_1.ref.def(target.name, fn, target.prototype, ":ControllerInterceptor");
    };
};
exports.UseControllerInterceptor = UseControllerInterceptor;
//# sourceMappingURL=global.js.map