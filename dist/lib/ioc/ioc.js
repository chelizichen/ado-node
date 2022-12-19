"use strict";
/**
 * @Author chelizichen
 * @description  DI 的 实现
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collect = exports.Inject = void 0;
require("reflect-metadata");
const ref_1 = require("./ref");
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