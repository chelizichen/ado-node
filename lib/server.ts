import express, { Express } from "express";
import path from "path";
import { ref } from "./handle.reflect";
import { HandleProxyOptions } from "./types";

function createServer(
  options: HandleProxyOptions,
  SSRFunc?: (app: Express) => void
) {
  const app: Express = express();
  app.use(express.json());
  const { port, staticDist, controller, base } = options;
  controller.forEach((el) => {
    const router = ref.get(el);
    app.use(base, router);
  });
  app.use(express.static(staticDist));

  if (SSRFunc) {
    SSRFunc(app);
  }
  app.listen(port, () => {
    console.log(`c http://localhost:${port}`);
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

export { createServer, createSSRServer };
