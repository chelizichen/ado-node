import Service from "../lib/handle.service";
import { HandleProxyOptions } from "../lib/types";
import { FishController } from "./Fish/fish.controller";
import { TESTCONTROLLER } from "./Test/test.controller";

export const options: HandleProxyOptions = {
  controller: [FishController, TESTCONTROLLER],
  base: "/api",
};

Service.clear();
