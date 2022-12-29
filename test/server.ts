import express from "express";
import path from "path";
import { Modules } from "../lib/module/module";
import { AppModule } from "./routes";
import { TestGlobalPipe } from "./pipe";
import { AdoNodeServer } from "../index";
import { viewTestModule } from './routes/viewTest/viewTest.module';

import { TestRpcClientController } from "./rpc/test.rpc";
import { RpcClientMap } from "../lib/rpc/bind";
@Modules({
  Modules: [AppModule,viewTestModule],
  Base: "/api",
  Port: 3000,
  GlobalPipes: [TestGlobalPipe],
})
class AdoNodeServerImpl extends AdoNodeServer { }

AdoNodeServerImpl.runSSRServer((app) => {

  app.use("/AdoServer", express.static(path.join(__dirname, "../public")));
  
  // 下一个事件循环执行
  setImmediate(()=>{
    const TestRpc = new TestRpcClientController()
    console.log("TestRpc",TestRpc);
    console.log('RpcClientMap',RpcClientMap);
  })
  
  // 建立TCP 连接
  // const socket = net.connect({
  //   'host': "localhost",
  //   'port': 9000
  // })

  // socket.write("测试发送")
  
  // net.createServer()
  // net.connect({
    // 
  // })

});
