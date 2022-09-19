import express, { Express } from "express";
import { ref } from "./handle.reflect";
import { HandleProxyOptions } from "./types";

function createServer(options: HandleProxyOptions) {
  const app: Express = express();
  const { port, staticDist } = options;
  app.use(express.json());

  const { base, controller } = options;
  controller.forEach((el) => {
    const router = ref.get(el);
    app.use(base, router);
  });

  app.use(express.static(staticDist));

  app.listen(port, () => {
    console.log(`c http://localhost:${port}`);
  });
}

export { createServer };
