"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenereateRouter = exports.SerivceMap = void 0;
const class_1 = require("./class");
const ref_1 = require("./ref");
// 创建SerivceMap
const SerivceMap = new Map();
exports.SerivceMap = SerivceMap;
/**
 * @methods GenereateRouter
 * @param Controller
 * @returns
 */
function GenereateRouter(Controller) {
    const URL = ref_1.ref.get("BaseUrl", Controller.prototype);
    const GetService = new Controller(URL, SerivceMap);
    return GetService[class_1.Boost](Controller);
}
exports.GenereateRouter = GenereateRouter;
//# sourceMappingURL=service.js.map