import { AdoNodeConfig, AdoNodeServer, ref } from "ado-node";
import { CommonClass } from "./config/common";
import { options } from "./routes";
import express, { Express } from "express";
import path from "path";
@AdoNodeConfig(CommonClass)
class AdoNodeServerImpl extends AdoNodeServer {
  static SSRServer() {
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
    const { port, controller, base } = options;
    controller.forEach((el) => {
      const router = ref.get(el);
      app.use(base, router);
    });

    // 创建静态目录
    // console.log(staticDist);

    app.use(express.static("dist/app"));

    // 创建端口号
    app.set("port", options.port);

    app.get("*", (_req, res) => {
      res.sendFile(path.join(__dirname, "app/index.html"));
    });
    app.listen(port, () => {
      console.log(
        `create server at  http://localhost:${port} Worker ${process.pid} started`
      );
    });
  }
}

AdoNodeServerImpl.SSRServer();
