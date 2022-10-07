"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collect = exports.Inject = void 0;
require("reflect-metadata");
const ref_1 = require("./ref");
/**
 * @description 在 Controller 层自动注入方法
 * @realize -- 在原型链上注入
 */
const Inject = (InjectTarget) => {
    return function (target, propertyKey) {
        const Service = ref_1.ref.get(InjectTarget);
        target.constructor.prototype[propertyKey] = Service;
    };
};
exports.Inject = Inject;
const Collect = () => {
    return function (target) {
        ref_1.ref.def(target, target.prototype);
    };
};
exports.Collect = Collect;
//# sourceMappingURL=ioc.js.map