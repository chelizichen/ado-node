import express from "express";
import path from "path";
import { Modules } from "../lib/module/module";
import { AppModule } from "./routes";
import { TestGlobalPipe } from "./pipe";
import { AdoNodeServer, ref } from "../index";
import { viewTestModule } from './routes/viewTest/viewTest.module';

import { TestRpcClientController, TestRpcClientController1 } from "./rpc/test.rpc";
import { RpcClientMap } from "../lib/rpc/bind";
@Modules({
  Modules: [AppModule,viewTestModule],
  Base: "/api",
  Port: 3000,
  GlobalPipes: [TestGlobalPipe],
  RpcController:[TestRpcClientController,TestRpcClientController1]
})
class AdoNodeServerImpl extends AdoNodeServer { }

AdoNodeServerImpl.runSSRServer((app) => {

  app.use("/AdoServer", express.static(path.join(__dirname, "../public")));
  
  // 下一个事件循环执行
  setImmediate(()=>{
    const BaseUrl = ref.get(TestRpcClientController.name,TestRpcClientController.prototype,":base")
    console.log("TestRpc",BaseUrl);
    console.log('RpcClientMap',RpcClientMap);
    for(let v in RpcClientMap){
      // v -> "/base1"
      let router = express.Router()
      RpcClientMap[v].forEach(el=>{
        let _el = Object.entries(el)[0]
        // @ts-ignore
        router.post(_el[0],_el[1])
      })
      app.use(v,router)
      // app.use(v,createRouter)
    }
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
