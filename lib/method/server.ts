import express, { Express } from "express";
import { ref } from "../ioc/ref";
import { AdoNodeOptions } from "../types";
import { cpus } from "os";
import cluster from "cluster";
function defineAdoNodeOptions(options: AdoNodeOptions) {
  return options;
}

class AdoNodeServer {
  static Controllers: any[] = [];

  static __getProvider__(provider: any[]) {
    if (provider.length && provider.length >= 1) {
      provider.forEach((el: any) => {
        const controller = ref.get(el.name, el.prototype, ":controller");
        const provider = ref.get(el.name, el.prototype, ":provider");
        this.__getProvider__(provider);
        if (
          controller.length &&
          controller.length >= 1 &&
          controller instanceof Array
        ) {
          controller.forEach((el) => {
            this.Controllers.push(el);
          });
        }
      });
    }
  }

  static createControllers() {
    const opt = ref.get(
      AdoNodeServer.name,
      AdoNodeServer.prototype,
      ":modules"
    );
    opt.forEach((el: any) => {
      const controller = ref.get(el.name, el.prototype, ":controller");
      const provider = ref.get(el.name, el.prototype, ":provider");

      this.__getProvider__(provider);
      if (
        controller.length &&
        controller.length >= 1 &&
        controller instanceof Array
      ) {
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
    const isCluster = ref.get(
      AdoNodeServer.name,
      AdoNodeServer.prototype,
      ":cluster"
    );

    if (isCluster) {
      let workers: Record<any, any> = {};

      if (cluster.isPrimary) {
        cluster.on("exit", (worker, _code, _signal) => {
          console.log(`工作进程 ${worker.process.pid} 已退出`);

          // @ts-ignore
          delete workers[worker.process.pid];
          worker = cluster.fork();
          // @ts-ignore
          workers[worker.process.pid] = worker;
        });

        // 衍生工作进程。
        for (let i = 0; i < cpus().length; i++) {
          let worker = cluster.fork();

          // @ts-ignore
          workers[worker.process.pid] = worker;
        }
      } else {
        this.runServer();
      }
    } else {
      this.runServer();
    }
  }

  static runServer() {
    const app: Express = express();
    const globalPipes = ref.get(
      AdoNodeServer.name,
      AdoNodeServer.prototype,
      ":globalPipes"
    );

    // 使用管道
    if (globalPipes && globalPipes.length && globalPipes instanceof Array) {
      globalPipes.forEach((pipe: any) => {
        const inst = new pipe();
        app.use("*", inst.run);
      });
    }
    // 使用JSON
    app.use(express.json());

    // 创建Router
    const port = ref.get(AdoNodeServer.name, AdoNodeServer.prototype, ":port");
    const base = ref.get(AdoNodeServer.name, AdoNodeServer.prototype, ":base");

    const controller = this.createControllers();
    controller.forEach((el) => {
      const router = ref.get(el);
      app.use(base, router);
    });
    // 创建静态目录

    // 创建端口号
    app.set("port", port);

    app.listen(port, () => {
      console.log(
        `create server at  http://localhost:${port} Worker ${process.pid} started`
      );
    });
  }

  static runSSRServer(callBack: (app: Express) => void) {
    const app: Express = express();
    const globalPipes = ref.get(
      AdoNodeServer.name,
      AdoNodeServer.prototype,
      ":globalPipes"
    );

    // 使用管道
    if (globalPipes && globalPipes.length && globalPipes instanceof Array) {
      globalPipes.forEach((pipe: any) => {
        const inst = new pipe();
        app.use("*", inst.run);
      });
    }
    // 使用JSON
    app.use(express.json());
    const base = ref.get(AdoNodeServer.name, AdoNodeServer.prototype, ":base");

    // 创建Router
    const controller = this.createControllers();
    controller.forEach((el) => {
      const router = ref.get(el);
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

export { AdoNodeServer, defineAdoNodeOptions };
