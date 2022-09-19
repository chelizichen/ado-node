"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
const handle_reflect_1 = require("./handle.reflect");
const Error = (e) => {
    return function (_target, _propertyKey, descriptor) {
        if (e.force) {
            descriptor.value = function (_req, res) {
                const { message, code } = e;
                res.json({ message, code });
            };
        }
        handle_reflect_1.ref.def("error", e, descriptor.value);
    };
};
exports.Error = Error;
//# sourceMappingURL=handle.error.js.map