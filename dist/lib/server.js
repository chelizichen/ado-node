"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const handle_reflect_1 = require("./handle.reflect");
function createServer(options) {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    const { port, staticDist } = options;
    const { base, controller } = options;
    controller.forEach((el) => {
        const router = handle_reflect_1.ref.get(el);
        app.use(base, router);
    });
    app.use(express_1.default.static(staticDist));
    app.listen(port, () => {
        console.log(`c http://localhost:${port}`);
    });
}
exports.createServer = createServer;
//# sourceMappingURL=server.js.map