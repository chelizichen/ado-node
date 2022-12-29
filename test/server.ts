import express from "express";
import path from "path";
import { Modules } from "../lib/module/module";
import { AppModule } from "./routes";
import { TestGlobalPipe } from "./pipe";
import { AdoNodeServer } from "../index";
import { viewTestModule } from './routes/viewTest/viewTest.module';
import * as net from 'net'
@Modules({
  Modules: [AppModule,viewTestModule],
  Base: "/api",
  Port: 3000,
  GlobalPipes: [TestGlobalPipe],
})
class AdoNodeServerImpl extends AdoNodeServer { }

AdoNodeServerImpl.runSSRServer((app) => {
  app.use("/AdoServer", express.static(path.join(__dirname, "../public")));
  const socket = net.createConnection({
    'host': "localhost",
    'port': 9000
  })

  socket.write("测试发送")
  
  // net.createServer()
  // net.connect({
    // 
  // })

});
