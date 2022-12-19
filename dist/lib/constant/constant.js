"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CODE = exports.MESSAGE = void 0;
var CODE;
(function (CODE) {
    CODE[CODE["CACHE"] = 10] = "CACHE";
    CODE[CODE["SUCCESS"] = 0] = "SUCCESS";
    CODE[CODE["ERROR"] = -1] = "ERROR";
    CODE[CODE["FIELDERROR"] = -2] = "FIELDERROR";
    CODE[CODE["TYPEERROR"] = -3] = "TYPEERROR";
    CODE[CODE["NOTFOUND"] = -4] = "NOTFOUND";
    CODE[CODE["SERVERERROR"] = -5] = "SERVERERROR";
})(CODE || (CODE = {}));
exports.CODE = CODE;
var MESSAGE;
(function (MESSAGE) {
    MESSAGE["CACHE"] = "cache";
    MESSAGE["SUCCESS"] = "success";
    MESSAGE["ERROR"] = "error";
    MESSAGE["FIELDERROR"] = "missing field";
    MESSAGE["TypeError"] = "type error";
    MESSAGE["NOTFOUND"] = "not found";
    MESSAGE["SERVERERROR"] = "server error";
})(MESSAGE || (MESSAGE = {}));
exports.MESSAGE = MESSAGE;
//# sourceMappingURL=constant.js.map