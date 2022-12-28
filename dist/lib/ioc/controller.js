"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const ref_1 = require("./ref");
const service_1 = require("./service");
const Controller = (BaseUrl) => {
    return (target) => {
        ref_1.ref.def("BaseUrl", BaseUrl, target.prototype);
        ref_1.ref.def(target, (0, service_1.GenereateRouter)(target.prototype.constructor));
        service_1.SerivceMap.clear();
    };
};
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map