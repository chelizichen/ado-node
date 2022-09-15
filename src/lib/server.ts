import express, { Express } from "express";
import { ref } from "../utils/core";
import { HandleProxyOptions } from "./types";

function createServer(options: HandleProxyOptions) {
  const app: Express = express();
  const { port } = options;
  // const { PORT = 3001 } = process.env;
  app.use(express.json());

  const { base, controller } = options;
  controller.forEach((el) => {
    const router = ref.get(el);
    app.use(base, router);
  });

  app.use(express.static("dist/app"));

  app.listen(port, () => {
    console.log(`c http://localhost:${port}`);
  });
}

export default createServer;
