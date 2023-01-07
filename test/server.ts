import express from "express";
import path from "path";
import { Modules } from "../lib/module/module";
import { AppModule } from "./routes";
import { TestGlobalPipe } from "./pipe";
import { AdoNodeServer } from "../index";
import { viewTestModule } from "./routes/viewTest/viewTest.module";

import {
  animalController,dogController
} from "./rpc/client/client";

import { RpcClientModules } from "../lib/rpc/run";


@RpcClientModules({
  RpcClientController: [animalController,dogController],
})
@Modules({
  Modules: [AppModule, viewTestModule],
  GlobalPipes: [TestGlobalPipe],
})
class AdoNodeServerImpl extends AdoNodeServer {}

AdoNodeServerImpl.runSSRServer((app) => {
  app.use("/AdoServer", express.static(path.join(__dirname, "../public")));
  // 下一个事件循环执行

});
