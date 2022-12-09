"use strict";
/**
 * @Monitor
 * @Autohr chelizichen
 * @Date 2022.12.9
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AfterInsert = exports.AfterUpdate = exports.AfterDestory = exports.BeforeUpdate = exports.BeforeDestory = exports.BeforeInsert = void 0;
const core_1 = require("../core");
const BeforeInsert = (target, _propertyKey, descriptor) => {
    const val = descriptor.value;
    core_1.ref.def("monitor", val, target.constructor.prototype, ":before-insert");
};
exports.BeforeInsert = BeforeInsert;
const BeforeDestory = (target, _propertyKey, descriptor) => {
    const val = descriptor.value;
    core_1.ref.def("monitor", val, target.constructor.prototype, ":before-destory");
};
exports.BeforeDestory = BeforeDestory;
const BeforeUpdate = (target, _propertyKey, descriptor) => {
    const val = descriptor.value;
    core_1.ref.def("monitor", val, target.constructor.prototype, ":before-update");
};
exports.BeforeUpdate = BeforeUpdate;
const AfterUpdate = (target, _propertyKey, descriptor) => {
    const val = descriptor.value;
    core_1.ref.def("monitor", val, target.constructor.prototype, ":after-update");
};
exports.AfterUpdate = AfterUpdate;
const AfterInsert = (target, _propertyKey, descriptor) => {
    const val = descriptor.value;
    core_1.ref.def("monitor", val, target.constructor.prototype, ":after-insert");
};
exports.AfterInsert = AfterInsert;
const AfterDestory = (target, _propertyKey, descriptor) => {
    const val = descriptor.value;
    core_1.ref.def("monitor", val, target.constructor.prototype, ":after-destory");
};
exports.AfterDestory = AfterDestory;
//# sourceMappingURL=monitor.js.map