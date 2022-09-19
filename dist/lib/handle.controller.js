"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const handle_reflect_1 = require("./handle.reflect");
const core_1 = require("./core");
const handle_service_1 = __importDefault(require("./handle.service"));
const Controller = (BaseUrl) => {
    return (target) => {
        handle_reflect_1.ref.def("BaseUrl", BaseUrl, target.prototype);
        handle_reflect_1.ref.def(target, (0, core_1.GenereateRouter)(target.prototype.constructor));
        handle_service_1.default.clear();
    };
};
exports.Controller = Controller;
//# sourceMappingURL=handle.controller.js.map