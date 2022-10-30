import express from "express";
import path from "path";
import { AdoNodeConfig, AdoNodeServer } from "../lib/core";
import { Modules } from "../lib/module/module";
import { commonClass } from "./config/common";
import { AppModule } from "./routes";
import { TestGlobalPipe } from "./routes/GlobalPipe";
@AdoNodeConfig(commonClass)
@Modules({
  Modules: [AppModule],
  Base: "/api",
  Port: 3000,
  GlobalPipes: [TestGlobalPipe],
})
class AdoNodeServerImpl extends AdoNodeServer {}
AdoNodeServerImpl.runSSRServer((app) => {
  app.use("/AdoServer", express.static(path.join(__dirname, "../public")));
});
