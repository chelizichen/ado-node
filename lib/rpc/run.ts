/**
 * @author chelizichen
 * @RpcModules
 */

import express, { Express } from "express";
import { ref } from "../ioc";
import { ArcServer } from "./server";
import { AdoNodeServer } from "../method";
import { nextTick } from "process";
import { Connection } from "../orm/conn";

type RpcServerModulesType = {
  RpcServerController: any[];
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
      try {
        await Connection.readConfig();
      } catch (e) {
        throw e
      }
    })();
    function boost() {
      setImmediate(async () => {
        const config = process.cwd() + "/ado.config.js";
        const _config = require(config);
        let server_config;
        if (_config) {
          // ESM 下 export default
          if (_config && _config.default) {
            server_config = _config.default.server;
          }
          // CommonJS 下 module.export
          else {
            server_config = _config.server;
          }
        }

        const { RpcServerController } = opt;
        let events = RpcServerController.map((item) => {
          const { name, prototype } = item;
          const event = ref.get(name, prototype, ":events");
          return event;
        });
        let server = new ArcServer({ host:server_config.host, port:server_config.port });
        server.registEvents(...events);
      });
    }
    ref.def(target.name, boost, target.prototype, ":boost")
  };
};

function RpcServerBoost(RpcServerClass: Function) {
  const { name, prototype } = RpcServerClass;
  const boost = ref.get(name, prototype, ":boost");
  return boost
}

const RpcClientModules = (RpcClientOptions: RpcClientModulestype) => {
  return function (_: typeof AdoNodeServer) {
    const { name, prototype } = AdoNodeServer;
    function RpcClient(app: Express) {
      let router = express.Router();
      let clientMap = {}

      nextTick(() => {
        RpcClientOptions.RpcClientController.forEach((controller) => {
          const { name, prototype } = controller;
          const Map = ref.get(name, prototype, ":clientMap");
          clientMap = Object.assign(clientMap, Map);
        });
        for (let v in clientMap) {
          //  @ts-ignore
          clientMap[v].forEach((el) => {
            let toarray = Object.entries(el)[0];
            //  @ts-ignore
            router.post(toarray[0], toarray[1]);
          });
          app.use(v, router);
        }
        console.log("clientMap", clientMap);
      })
    }
    ref.def(name, RpcClient, prototype, ":rpc-client");
  };
};

export { RpcServerModules, RpcClientModules, RpcServerBoost };
