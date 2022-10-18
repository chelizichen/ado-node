import express, { Express } from "express";
import path from "path";
import { ref } from "../ioc/ref";
import { HandleProxyOptions } from "../types";
import { cpus } from "os";
import cluster from "cluster";
// import http from "http";
// import { debug } from "node:util";
function defineAdoNodeOptions(options: HandleProxyOptions) {
  return options;
}

function createSSRServer(options: HandleProxyOptions) {
  const app: Express = express();
  app.use(express.json());
  const { port, staticDist } = options;
  const { base, controller } = options;

  controller.forEach((el) => {
    const router = ref.get(el);
    console.log("router", router);

    app.use(base, router);
  });

  app.use(express.static(staticDist));

  app.get("*", (_req: any, res: any) => {
    res.sendFile(path.join(__dirname, "app/index.html"));
  });

  app.listen(port, () => {
    console.log(`c http://localhost:${port}`);
  });
}

class AdoNodeServer {
  static run(options: HandleProxyOptions) {
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

  static runServer(options: HandleProxyOptions) {
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
}

export { createSSRServer, AdoNodeServer, defineAdoNodeOptions };
