import express, { Express } from "express";
import { ref } from "../ioc/ref";
import { AdoNodeOptions } from "../types";
import { cpus } from "os";
import cluster from "cluster";
function defineAdoNodeOptions(options: AdoNodeOptions) {
  return options;
}

class AdoNodeServer {
  static run(options: AdoNodeOptions) {
    // 开启多进程

    if (options.cluster) {
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
        this.runServer(options);
      }
    } else {
      this.runServer(options);
    }
  }

  static runServer(options: AdoNodeOptions) {
    const app: Express = express();
    // 使用管道
    if (
      options.globalPipes &&
      options.globalPipes.length &&
      options instanceof Array
    ) {
      options.globalPipes.forEach((pipe: any) => {
        const inst = new pipe();
        app.use("*", inst.run);
      });
    }
    // 使用JSON
    app.use(express.json());

    // 创建Router
    const { port, staticDist, controller, base } = options;
    controller.forEach((el) => {
      const router = ref.get(el);
      app.use(base, router);
    });
    // 创建静态目录
    app.use(express.static(staticDist));

    // 创建端口号
    app.set("port", options.port);

    app.listen(port, () => {
      console.log(
        `create server at  http://localhost:${port} Worker ${process.pid} started`
      );
    });
  }

  static runSSRServer(
    options: AdoNodeOptions,
    callBack: (app: Express) => void
  ) {
    const app: Express = express();
    // 使用管道
    if (
      options.globalPipes &&
      options.globalPipes.length &&
      options instanceof Array
    ) {
      options.globalPipes.forEach((pipe: any) => {
        const inst = new pipe();
        app.use("*", inst.run);
      });
    }
    // 使用JSON
    app.use(express.json());

    // 创建Router
    const { controller, base } = options;
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
