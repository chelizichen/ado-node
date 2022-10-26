import { App919Controller } from "./App919/App919.controller";
import { App917Controller } from "./App917/App917.controller";
import { App106Controller } from "./App106/App106.controller";
import { App1017Controller } from "./App1017/App1017.controller";
import { TestGlobalPipe } from "./GlobalPipe";
import { defineAdoNodeOptions } from "../../lib/method/server";
const options = defineAdoNodeOptions({
  controller: [
    App917Controller,
    App919Controller,
    App106Controller,
    App1017Controller,
  ],
  base: "/api",
  port: 3000,
  staticDist: "dist/app",
  globalPipes: [TestGlobalPipe],
  cluster: true,
});

export { options };
