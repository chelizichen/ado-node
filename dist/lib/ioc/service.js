"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenereateRouter = exports.SerivceMap = void 0;
const ref_1 = require("./ref");
// 创建SerivceMap
exports.SerivceMap = new Map();
/**
 * @methods GenereateRouter
 * @param Controller
 * @returns
 */
function GenereateRouter(Controller) {
    const URL = ref_1.ref.get("BaseUrl", Controller.prototype);
    const GetService = new Controller(URL, exports.SerivceMap);
    return GetService.Boost();
}
exports.GenereateRouter = GenereateRouter;
//# sourceMappingURL=service.js.map