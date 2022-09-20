import { HandleProxyOptions } from "ado-node/lib/types";
import { AppController } from "./App/App.Controller";

const options: HandleProxyOptions = {
  controller: [AppController],
  base: "/api",
  staticDist: "dist",
  port: 3000,
};

export { options };
