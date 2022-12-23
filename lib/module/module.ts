import { AdoNodeServer, ref } from "../../index";
import { AdoModuleOptions, AdoModulesOptions } from "../../index.d";

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
    ref.def(
      AdoNodeServer.name,
      modules.Modules,
      AdoNodeServer.prototype,
      ":modules"
    );
    ref.def(AdoNodeServer.name, modules.Base, AdoNodeServer.prototype, ":base");
    ref.def(
      AdoNodeServer.name,
      modules.GlobalPipes,
      AdoNodeServer.prototype,
      ":globalPipes"
    );
    ref.def(AdoNodeServer.name, modules.Port, AdoNodeServer.prototype, ":port");
    ref.def(
      AdoNodeServer.name,
      modules.Cluster,
      AdoNodeServer.prototype,
      ":cluster"
    );
  };
};
export { Module, Modules };
