"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesError = void 0;
const constant_1 = require("../constant/constant");
class TypesError extends Error {
    name = "TypeError";
    code = constant_1.CODE.TYPEERROR;
    message;
    constructor(message) {
        super(message);
        this.message = message;
    }
    static RetTypeError(message) {
        const data = new TypesError(message);
        return {
            code: constant_1.CODE.TYPEERROR,
            message: constant_1.MESSAGE.TypeError,
            data: data,
        };
    }
}
exports.TypesError = TypesError;
//# sourceMappingURL=type.js.map