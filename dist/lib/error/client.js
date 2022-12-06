"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientError = void 0;
const core_1 = require("../core");
// 客户端错误
class ClientError extends Error {
    name = "ClientError";
    code = core_1.CODE.ERROR;
    message;
    constructor(message) {
        super(message);
        this.message = message;
    }
    static RetClientError(message) {
        const data = new ClientError(message);
        return {
            code: core_1.CODE.ERROR,
            message: core_1.MESSAGE.ERROR,
            data,
        };
    }
}
exports.ClientError = ClientError;
//# sourceMappingURL=client.js.map