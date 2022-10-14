import { HandleProxyOptions } from "../../lib/types";
import { App919Controller } from "./App919/App919.controller";
import { App917Controller } from "./App917/App917.controller";
import { App106Controller } from "./App106/App106.controller";
import { TestGlobalPipe } from "./GlobalPipe";
const options: HandleProxyOptions = {
  controller: [App917Controller, App919Controller, App106Controller],
  base: "/api",
  port: 3000,
  staticDist: "dist/app",
  globalPipes: [TestGlobalPipe],
};

export { options };
