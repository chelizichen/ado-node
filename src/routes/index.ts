import { App919Controller } from "./App919/App919.controller";
import { App917Controller } from "./App917/App917.controller";
export const options = {
  controller: [App917Controller, App919Controller],
  base: "/api",
  port: 3000,
  staticDist: "dist/app",
};
