"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldError = void 0;
const core_1 = require("../core");
class FieldError extends Error {
    name = "FieldError";
    code = core_1.CODE.FIELDERROR;
    message;
    constructor(message) {
        super(message);
        this.message = message;
    }
    static RetFieldError(message) {
        const data = new FieldError(message);
        return {
            code: core_1.CODE.FIELDERROR,
            message: core_1.MESSAGE.FIELDERROR,
            data,
        };
    }
}
exports.FieldError = FieldError;
//# sourceMappingURL=field.js.map