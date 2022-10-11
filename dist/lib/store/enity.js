"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnityTable = exports.Keyword = exports.Key = exports.Enity = void 0;
const ref_1 = require("../ioc/ref");
const Enity = (target) => {
    const targetInst = new target(target);
    // ref.def(target, target.prototype);
    ref_1.ref.def(target.name, targetInst, target.prototype);
};
exports.Enity = Enity;
const Key = (target, propertyKey) => {
    ref_1.ref.def("key", propertyKey, target.constructor.prototype);
};
exports.Key = Key;
const Keyword = (target, propertyKey) => {
    ref_1.ref.def("keyword", propertyKey, target.constructor.prototype);
};
exports.Keyword = Keyword;
const EnityTable = new Map();
exports.EnityTable = EnityTable;
//# sourceMappingURL=enity.js.map