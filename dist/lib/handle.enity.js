"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnityTable = exports.Keyword = exports.Key = exports.Enity = void 0;
const handle_reflect_1 = require("./handle.reflect");
const Enity = (target) => {
    handle_reflect_1.ref.def(target.name + "Enity", target.prototype, target.prototype);
};
exports.Enity = Enity;
const Key = (target, propertyKey) => {
    handle_reflect_1.ref.def("key", propertyKey, target.constructor.prototype);
};
exports.Key = Key;
const Keyword = (target, propertyKey) => {
    handle_reflect_1.ref.def("keyword", propertyKey, target.constructor.prototype);
};
exports.Keyword = Keyword;
const EnityTable = new Map();
exports.EnityTable = EnityTable;
//# sourceMappingURL=handle.enity.js.map