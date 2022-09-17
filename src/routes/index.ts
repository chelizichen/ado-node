import Service from "../lib/handle.service";
import { HandleProxyOptions } from "../lib/types";
import { Date917Controller } from "./Date917/Date917.controller";
import { FishController } from "./Fish/fish.controller";
import { TESTCONTROLLER } from "./Test/test.controller";

export const options: HandleProxyOptions = {
  controller: [FishController, TESTCONTROLLER, Date917Controller],
  base: "/api",
  port: 3000,
};

Service.clear();
