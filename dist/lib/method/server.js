"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineAdoNodeOptions = exports.AdoNodeServer = void 0;
const express_1 = __importDefault(require("express"));
const ref_1 = require("../ioc/ref");
const os_1 = require("os");
const cluster_1 = __importDefault(require("cluster"));
function defineAdoNodeOptions(options) {
    return options;
}
exports.defineAdoNodeOptions = defineAdoNodeOptions;
class AdoNodeServer {
    static Controllers = [];
    static __getProvider__(provider) {
        if (provider.length && provider.length >= 1) {
            provider.forEach((el) => {
                const controller = ref_1.ref.get(el.name, el.prototype, ":controller");
                const provider = ref_1.ref.get(el.name, el.prototype, ":provider");
                this.__getProvider__(provider);
                if (controller.length &&
                    controller.length >= 1 &&
                    controller instanceof Array) {
                    controller.forEach((el) => {
                        this.Controllers.push(el);
                    });
                }
            });
        }
    }
    static createControllers() {
        const opt = ref_1.ref.get(AdoNodeServer.name, AdoNodeServer.prototype, ":modules");
        opt.forEach((el) => {
            const controller = ref_1.ref.get(el.name, el.prototype, ":controller");
            const provider = ref_1.ref.get(el.name, el.prototype, ":provider");
            this.__getProvider__(provider);
            if (controller.length &&
                controller.length >= 1 &&
                controller instanceof Array) {
                controller.forEach((el) => {
                    this.Controllers.push(el);
                });
            }
        });
        const Controller = [...new Set(this.Controllers)];
        return Controller;
    }
    static run() {
        // 开启多进程
        const isCluster = ref_1.ref.get(AdoNodeServer.name, AdoNodeServer.prototype, ":cluster");
        if (isCluster) {
            let workers = {};
            if (cluster_1.default.isPrimary) {
                cluster_1.default.on("exit", (worker, _code, _signal) => {
                    console.log(`工作进程 ${worker.process.pid} 已退出`);
                    // @ts-ignore
                    delete workers[worker.process.pid];
                    worker = cluster_1.default.fork();
                    // @ts-ignore
                    workers[worker.process.pid] = worker;
                });
                // 衍生工作进程。
                for (let i = 0; i < (0, os_1.cpus)().length; i++) {
                    let worker = cluster_1.default.fork();
                    // @ts-ignore
                    workers[worker.process.pid] = worker;
                }
            }
            else {
                this.runServer();
            }
        }
        else {
            this.runServer();
        }
    }
    static runServer() {
        const app = (0, express_1.default)();
        const globalPipes = ref_1.ref.get(AdoNodeServer.name, AdoNodeServer.prototype, ":globalPipes");
        // 使用管道
        if (globalPipes && globalPipes.length && globalPipes instanceof Array) {
            globalPipes.forEach((pipe) => {
                const inst = new pipe();
                app.use("*", inst.run);
            });
        }
        // 使用JSON
        app.use(express_1.default.json());
        // 创建Router
        const port = ref_1.ref.get(AdoNodeServer.name, AdoNodeServer.prototype, ":port");
        const base = ref_1.ref.get(AdoNodeServer.name, AdoNodeServer.prototype, ":base");
        const controller = this.createControllers();
        controller.forEach((el) => {
            const router = ref_1.ref.get(el);
            app.use(base, router);
        });
        // 创建静态目录
        // 创建端口号
        app.set("port", port);
        app.listen(port, () => {
            console.log(`create server at  http://localhost:${port} Worker ${process.pid} started`);
        });
    }
    static runSSRServer(callBack) {
        const app = (0, express_1.default)();
        const globalPipes = ref_1.ref.get(AdoNodeServer.name, AdoNodeServer.prototype, ":globalPipes");
        // 使用管道
        if (globalPipes && globalPipes.length && globalPipes instanceof Array) {
            globalPipes.forEach((pipe) => {
                const inst = new pipe();
                app.use("*", inst.run);
            });
        }
        // 使用JSON
        app.use(express_1.default.json());
        const base = ref_1.ref.get(AdoNodeServer.name, AdoNodeServer.prototype, ":base");
        // 创建Router
        const controller = this.createControllers();
        controller.forEach((el) => {
            const router = ref_1.ref.get(el);
            app.use(base, router);
        });
        /**
         * // if use vite ssr
         * app.use(express.static("dist/app"));
         * // create port
         * app.set("port", options.port);
         * app.get("*", (_req, res) => {
         *
         * // send ssr html
         * res.sendFile(path.join(__dirname, "app/index.html"));
         * });
         * // listen
         * app.listen(port, () => {
         *    console.log(
         *    `create server at  http://localhost:${port} Worker ${process.pid} started`
         *    );
         * });
         */
        callBack(app);
    }
}
exports.AdoNodeServer = AdoNodeServer;
//# sourceMappingURL=server.js.map