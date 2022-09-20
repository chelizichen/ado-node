"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userNamePipe = exports.useIdPipe = void 0;
function useIdPipe(req) {
    if (req.query.id > 20) {
        throw new Error("id 值不能大于 20");
    }
    return;
}
exports.useIdPipe = useIdPipe;
function userNamePipe(req) {
    if (!req.query.name) {
        throw new Error("name 不嫩为空");
    }
    return;
}
exports.userNamePipe = userNamePipe;
//# sourceMappingURL=App917.pipe.js.map