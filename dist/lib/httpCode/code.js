"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Code = void 0;
const core_1 = require("../core");
const Code = (status) => {
    return function (target, propertyKey) {
        core_1.ref.def(propertyKey, status, target.constructor.prototype, ":status");
    };
};
exports.Code = Code;
//# sourceMappingURL=code.js.map