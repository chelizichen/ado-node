import express, { Express } from "express";
import path from "path";
import { ref } from "../ioc/ref";
import { HandleProxyOptions } from "../types";

function createServer(options: HandleProxyOptions) {
  const app: Express = express();
  options.globalPipes.forEach((el: any) => {
    const inst = new el();
    app.use("*", inst.run);
  });
  app.use(express.json());
  const { port, staticDist, controller, base } = options;
  controller.forEach((el) => {
    const router = ref.get(el);
    app.use(base, router);
  });
  app.use(express.static(staticDist));
  app.listen(port, () => {
    console.log(`create server at  http://localhost:${port}`);
  });
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
  static run(options: any) {
    createServer(options);
  }
}

export { createServer, createSSRServer, AdoNodeServer };
