import { AdoNodeServer, ref } from "../../index";
import { BaseController } from "../ioc/type";

type AdoModuleOptions = {
  Controller: BaseController[];
  Provider: any[];
};

type AdoModulesOptions = {
  Modules: any[];
  GlobalPipes: any[];
  Cluster?: boolean;
};

// @Module({
// 	Controller:[],
// 	Provider:[CPUModule,DisplayModule,CacheModule,DiskModule]
// })
// class ComputerModule{}


const Module = (AdoNodeOptions: AdoModuleOptions): ClassDecorator => {
  return function (target: Function) {
    ref.def(
      target.name,
      AdoNodeOptions.Controller,
      target.prototype,
      ":controller"
    );
    ref.def(
      target.name,
      AdoNodeOptions.Provider,
      target.prototype,
      ":provider"
    );
    ref.def(target.name, true, target.prototype, ":module");
  };
};

const Modules = (modules: AdoModulesOptions): ClassDecorator => {
  modules.Modules.forEach((el) => {
    const isModule = ref.get(el.name, el.prototype, ":module");
    if (!isModule) {
      throw new Error(`${el.name} is Not a Moudle`);
    }
    
  });
  return function () {
    const config = process.cwd() + "/ado.config.js";
    try {
      const _config = require(config);
      let server;
      if (_config) {
        // ESM 下 export default
        if (_config && _config.default) {
          server = _config.default.server;
        }
        // CommonJS 下 module.export
        else {
          server = _config.server;
        }
      }
      ref.def(AdoNodeServer.name, server.base, AdoNodeServer.prototype, ":base");
      ref.def(AdoNodeServer.name, server.port, AdoNodeServer.prototype, ":port");
      ref.def(AdoNodeServer.name, server.upload, AdoNodeServer.prototype, ":load");

    } catch (e) {
      throw e;
    }
    ref.def(
      AdoNodeServer.name,
      modules.Modules,
      AdoNodeServer.prototype,
      ":modules"
    );

    
    ref.def(
      AdoNodeServer.name,
      modules.GlobalPipes,
      AdoNodeServer.prototype,
      ":globalPipes"
    );
    ref.def(
      AdoNodeServer.name,
      modules.Cluster,
      AdoNodeServer.prototype,
      ":cluster"
    );
  };
};
export { Module, Modules };
