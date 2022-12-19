"use strict";
/**
 * @Monitor
 * @Autohr chelizichen
 * @Date 2022.12.9
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeforeUpdate = exports.BeforeDelete = exports.BeforeInsert = void 0;
const ioc_1 = require("../ioc");
const BeforeInsert = (target, _propertyKey, descriptor) => {
    const val = descriptor.value;
    ioc_1.ref.def("monitor", val, target.constructor.prototype, ":before-insert");
};
exports.BeforeInsert = BeforeInsert;
const BeforeDelete = (target, _propertyKey, descriptor) => {
    const val = descriptor.value;
    ioc_1.ref.def("monitor", val, target.constructor.prototype, ":before-delete");
};
exports.BeforeDelete = BeforeDelete;
const BeforeUpdate = (target, _propertyKey, descriptor) => {
    const val = descriptor.value;
    ioc_1.ref.def("monitor", val, target.constructor.prototype, ":before-update");
};
exports.BeforeUpdate = BeforeUpdate;
//# sourceMappingURL=monitor.js.map