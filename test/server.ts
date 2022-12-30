import express from "express";
import path from "path";
import { Modules } from "../lib/module/module";
import { AppModule } from "./routes";
import { TestGlobalPipe } from "./pipe";
import { AdoNodeServer } from "../index";
import { viewTestModule } from "./routes/viewTest/viewTest.module";

import {
  TestRpcClientController,
  TestRpcClientController1,
} from "./rpc/test.rpc";
import { RpcClientModules } from "../lib/rpc/run";
@RpcClientModules({
  RpcClientController: [TestRpcClientController,TestRpcClientController1],
})
@Modules({
  Modules: [AppModule, viewTestModule],
  Base: "/api",
  Port: 3000,
  GlobalPipes: [TestGlobalPipe],
})
class AdoNodeServerImpl extends AdoNodeServer {}

AdoNodeServerImpl.runSSRServer((app) => {
  app.use("/AdoServer", express.static(path.join(__dirname, "../public")));
  // 下一个事件循环执行

});
