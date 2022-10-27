/**
 * 暂定api
 * @Decorator @Module
 * 将一个模块打包成一个服务 同时开启多个端口的服务
 * @Module()
 * export class AppModule {}
 *
 * @Module()
 * export class UserModule{}
 *
 * @Modules([AppModule,UserModule])
 * class AdoNodeModulesImpl extends AdoNodeMoudles
 */
import { ref } from "../core";
import { AdoModuleOptions } from "../types";

const Module = (AdoNodeOptions: AdoModuleOptions): ClassDecorator => {
  return function (target: Function) {
    ref.def(target.name, AdoNodeOptions, target.prototype);
    ref.def(target.name, true, target.prototype, ":module");
  };
};

const Modules = (modules: Function[]) => {
  modules.forEach((el) => {
    const isModule = ref.get(el.name, el.prototype, ":module");
    if (!isModule) {
      throw new Error(`${el.name} is Not a Moudle`);
    }
  });
  return function (target: Function) {
    ref.def(target.name, modules, target.prototype, ":modules");
  };
};

class AdoNodeModules {}

@Module({
  Controller: [],
  Base: "/user",
  Port: 3001,
  GlobalPipes: [],
})
class AppModule {}

@Module({
  Controller: [],
  Base: "/user",
  Port: 3001,
  GlobalPipes: [],
})
class UserModule {}

@Modules([AppModule, UserModule])
class AdoNodeModulesImpl extends AdoNodeModules {
  static main() {}
}

AdoNodeModulesImpl.main();

export { Module };
