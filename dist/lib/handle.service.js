"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenereateRouter = void 0;
const handle_reflect_1 = require("./handle.reflect");
// 创建SerivceMap
const SerivceMap = new Map();
exports.default = SerivceMap;
/**
 * @methods GenereateRouter
 * @param Controller
 * @returns
 */
function GenereateRouter(Controller) {
    const URL = handle_reflect_1.ref.get("BaseUrl", Controller.prototype);
    const GetService = new Controller(URL, SerivceMap);
    return GetService.Boost();
}
exports.GenereateRouter = GenereateRouter;
//# sourceMappingURL=handle.service.js.map