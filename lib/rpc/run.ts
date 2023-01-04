/**
 * @author chelizichen
 * @RpcModules
 */

import express, { Express } from "express";
import { ref } from "../ioc";
import { RpcClientMap } from "./bind";
import { ArcServer } from "./server";
import { AdoNodeServer } from "../method";
import { nextTick } from "process";
import { Connection } from "../orm/conn";

type RpcServerModulesType = {
  RpcServerController: any[];
  host: string;
  port: number;
};

type RpcClientModulestype = {
  RpcClientController: any[];
};

/**
 * @description 先根据 host 和 port 进行 tcp 服务创建
 * @description 再根据每个 RpcServerController 所带有的服务端事件进行注册
 */
const RpcServerModules = (opt: RpcServerModulesType) => {
  return function (target: Function) {
    (async function () {
      try{
        await Connection.readConfig();
      }catch(e){
        throw e
      }
    })();
    function boost() {
      setImmediate(() => {
        const { RpcServerController, host, port } = opt;
        let events = RpcServerController.map((item) => {
          const { name, prototype } = item;
          const event = ref.get(name, prototype, ":events");
          return event;
        });
        let server = new ArcServer({ host, port });
        server.registEvents(...events);
      });
    }
    ref.def(target.name,boost,target.prototype,":boost")
  };
};

function RpcServerBoost(RpcServerClass:Function) {
      const { name, prototype } = RpcServerClass;
      const boost = ref.get(name, prototype, ":boost");
  return boost
}

const RpcClientModules = (_: RpcClientModulestype) => {
  return function (_: typeof AdoNodeServer) {
    const { name, prototype } = AdoNodeServer;
    function RpcClient(app: Express) {
      let router = express.Router();
      nextTick(() => {
        console.log("RpcClientMap", RpcClientMap);
        for (let v in RpcClientMap) {
          RpcClientMap[v].forEach((el) => {
            let toarray = Object.entries(el)[0];
            //@ts-ignore
            router.post(toarray[0], toarray[1]);
          });
          app.use(v, router);
        }
      });
    }
    ref.def(name, RpcClient, prototype, ":rpc-client");
  };
};

export { RpcServerModules, RpcClientModules, RpcServerBoost };
