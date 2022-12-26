"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldError = void 0;
const constant_1 = require("../constant/constant");
class FieldError extends Error {
    name = "FieldError";
    code = constant_1.CODE.FIELDERROR;
    message;
    constructor(message) {
        super(message);
        this.message = message;
    }
    static RetFieldError(message) {
        const data = new FieldError(message);
        return {
            code: constant_1.CODE.FIELDERROR,
            message: constant_1.MESSAGE.FIELDERROR,
            data,
        };
    }
}
exports.FieldError = FieldError;
//# sourceMappingURL=field.js.map