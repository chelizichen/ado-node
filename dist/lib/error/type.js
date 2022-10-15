"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesError = void 0;
const core_1 = require("../core");
class TypesError extends Error {
    name = "TypeError";
    code = core_1.CODE.TYPEERROR;
    message;
    constructor(message) {
        super(message);
        this.message = message;
    }
    static RetTypeError(message) {
        const data = new TypesError(message);
        return {
            code: core_1.CODE.TYPEERROR,
            message: core_1.MESSAGE.TypeError,
            data: data,
        };
    }
}
exports.TypesError = TypesError;
//# sourceMappingURL=type.js.map