"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseError = void 0;
const core_1 = require("../core");
// 数据库错误
class DataBaseError extends Error {
    name = "DataBaseError";
    code = core_1.CODE.ERROR;
    detail;
    constructor(message, detail) {
        super(message);
        this.detail = detail;
    }
}
exports.DataBaseError = DataBaseError;
//# sourceMappingURL=dababase.js.map