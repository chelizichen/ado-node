"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSSRServer = exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const handle_reflect_1 = require("./handle.reflect");
function createServer(options, SSRFunc) {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    const { port, staticDist, controller, base } = options;
    controller.forEach((el) => {
        const router = handle_reflect_1.ref.get(el);
        app.use(base, router);
    });
    app.use(express_1.default.static(staticDist));
    if (SSRFunc) {
        SSRFunc(app);
    }
    app.listen(port, () => {
        console.log(`c http://localhost:${port}`);
    });
}
exports.createServer = createServer;
function createSSRServer(options) {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    const { port, staticDist } = options;
    const { base, controller } = options;
    controller.forEach((el) => {
        const router = handle_reflect_1.ref.get(el);
        console.log("router", router);
        app.use(base, router);
    });
    app.use(express_1.default.static(staticDist));
    app.get("*", (_req, res) => {
        res.sendFile(path_1.default.join(__dirname, "app/index.html"));
    });
    app.listen(port, () => {
        console.log(`c http://localhost:${port}`);
    });
}
exports.createSSRServer = createSSRServer;
//# sourceMappingURL=server.js.map