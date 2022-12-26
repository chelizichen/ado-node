"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseError = void 0;
const constant_1 = require("../constant/constant");
// 数据库错误
class DataBaseError extends Error {
    name = "DataBaseError";
    code = constant_1.CODE.ERROR;
    detail;
    constructor(message, detail) {
        super(message);
        this.detail = detail;
    }
}
exports.DataBaseError = DataBaseError;
//# sourceMappingURL=dababase.js.map