"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDb = void 0;
const ref_1 = require("../ioc/ref");
// target: Object,
// propertyKey: string | symbol,
// descriptor: PropertyDescriptor
const CreateDb = (dbname) => {
    return function (target, _propertyKey, descriptor) {
        const val = descriptor.value();
        ref_1.ref.def(dbname, val, target.constructor.prototype);
    };
};
exports.CreateDb = CreateDb;
//# sourceMappingURL=db.js.map