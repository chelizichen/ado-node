"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGE = exports.CODE = exports.CONSTANT = void 0;
var CONSTANT;
(function (CONSTANT) {
    CONSTANT["Observer"] = "Observer";
    CONSTANT["Config"] = "Config";
    CONSTANT["Config_INST"] = "Config_Inst";
})(CONSTANT = exports.CONSTANT || (exports.CONSTANT = {}));
var CODE;
(function (CODE) {
    CODE[CODE["CACHE"] = 10] = "CACHE";
    CODE[CODE["SUCCESS"] = 0] = "SUCCESS";
    CODE[CODE["ERROR"] = -1] = "ERROR";
    CODE[CODE["FIELDERROR"] = -2] = "FIELDERROR";
    CODE[CODE["TYPEERROR"] = -3] = "TYPEERROR";
    CODE[CODE["NOTFOUND"] = -4] = "NOTFOUND";
})(CODE = exports.CODE || (exports.CODE = {}));
var MESSAGE;
(function (MESSAGE) {
    MESSAGE["CACHE"] = "cache";
    MESSAGE["SUCCESS"] = "success";
    MESSAGE["ERROR"] = "error";
    MESSAGE["FIELDERROR"] = "missing field";
    MESSAGE["TypeError"] = "type error";
    MESSAGE["NOTFOUND"] = "not found";
})(MESSAGE = exports.MESSAGE || (exports.MESSAGE = {}));
//# sourceMappingURL=constant.js.map