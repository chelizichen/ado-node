"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Code = void 0;
const index_1 = require("../../index");
const Code = (status) => {
    return function (target, propertyKey) {
        index_1.ref.def(propertyKey, status, target.constructor.prototype, ":status");
    };
};
exports.Code = Code;
//# sourceMappingURL=code.js.map