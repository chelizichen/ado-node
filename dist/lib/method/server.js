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
// import http from "http";
// import { debug } from "node:util";
function defineAdoNodeOptions(options) {
    return options;
}
exports.defineAdoNodeOptions = defineAdoNodeOptions;
class AdoNodeServer {
    static run(options) {
        // 开启多进程
        if (options.cluster) {
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
                this.runServer(options);
            }
        }
        else {
            this.runServer(options);
        }
    }
    static runServer(options) {
        const app = (0, express_1.default)();
        // 使用管道
        if (options.globalPipes &&
            options.globalPipes.length &&
            options instanceof Array) {
            options.globalPipes.forEach((pipe) => {
                const inst = new pipe();
                app.use("*", inst.run);
            });
        }
        // 使用JSON
        app.use(express_1.default.json());
        // 创建Router
        const { port, staticDist, controller, base } = options;
        controller.forEach((el) => {
            const router = ref_1.ref.get(el);
            app.use(base, router);
        });
        // 创建静态目录
        app.use(express_1.default.static(staticDist));
        // 创建端口号
        app.set("port", options.port);
        app.listen(port, () => {
            console.log(`create server at  http://localhost:${port} Worker ${process.pid} started`);
        });
    }
    static runSSRServer(options, callBack) {
        const app = (0, express_1.default)();
        // 使用管道
        if (options.globalPipes &&
            options.globalPipes.length &&
            options instanceof Array) {
            options.globalPipes.forEach((pipe) => {
                const inst = new pipe();
                app.use("*", inst.run);
            });
        }
        // 使用JSON
        app.use(express_1.default.json());
        // 创建Router
        const { controller, base } = options;
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