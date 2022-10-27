/**
 * 暂定api
 * @Decorator @Module
 * 将很多个模块组合起来 最后组合成一个单独的模块进行服务
 * @Module()
 * export class AppModule {}
 *
 * @Module()
 * export class UserModule{}
 *
 * @Modules([AppModule,UserModule])
 * class AdoNodeModulesImpl extends AdoNodeMoudles
 */
import { AdoNodeServer, ref } from "../core";
import { AdoModuleOptions, AdoModulesOptions } from "../types";

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

// class AdoNodeModules {
//   static Controllers: any[] = [];

//   static __getProvider__(provider: any[]) {
//     if (provider.length && provider.length >= 1) {
//       provider.forEach((el: any) => {
//         const controller = ref.get(el.name, el.prototype, ":controller");
//         const provider = ref.get(el.name, el.prototype, ":provider");
//         this.__getProvider__(provider);
//         if (
//           controller.length &&
//           controller.length >= 1 &&
//           controller instanceof Array
//         ) {
//           controller.forEach((el) => {
//             this.Controllers.push(el);
//           });
//         }
//       });
//     }
//   }

//   static createControllers() {
//     const opt = ref.get(
//       AdoNodeModules.name,
//       AdoNodeModules.prototype,
//       ":modules"
//     );
//     opt.forEach((el: any) => {
//       const controller = ref.get(el.name, el.prototype, ":controller");
//       const provider = ref.get(el.name, el.prototype, ":provider");
//       this.__getProvider__(provider);
//       if (
//         controller.length &&
//         controller.length >= 1 &&
//         controller instanceof Array
//       ) {
//         controller.forEach((el) => {
//           this.Controllers.push(el);
//         });
//       }
//     });
//     const Controller = [...new Set(this.Controllers)];
//     return Controller;
//   }
//   static run(options: AdoNodeOptions) {
//     // 开启多进程

//     if (options.cluster) {
//       let workers: Record<any, any> = {};

//       if (cluster.isPrimary) {
//         cluster.on("exit", (worker, _code, _signal) => {
//           console.log(`工作进程 ${worker.process.pid} 已退出`);

//           // @ts-ignore
//           delete workers[worker.process.pid];
//           worker = cluster.fork();
//           // @ts-ignore
//           workers[worker.process.pid] = worker;
//         });

//         // 衍生工作进程。
//         for (let i = 0; i < cpus().length; i++) {
//           let worker = cluster.fork();

//           // @ts-ignore
//           workers[worker.process.pid] = worker;
//         }
//       } else {
//         this.runServer(options);
//       }
//     } else {
//       this.runServer(options);
//     }
//   }

//   static runServer(options: AdoNodeOptions) {
//     const app: Express = express();
//     // 使用管道
//     if (
//       options.globalPipes &&
//       options.globalPipes.length &&
//       options instanceof Array
//     ) {
//       options.globalPipes.forEach((pipe: any) => {
//         const inst = new pipe();
//         app.use("*", inst.run);
//       });
//     }
//     // 使用JSON
//     app.use(express.json());

//     // 创建Router
//     const { port, staticDist, base } = options;
//     const controller = this.createControllers();
//     controller.forEach((el) => {
//       const router = ref.get(el);
//       app.use(base, router);
//     });
//     // 创建静态目录
//     app.use(express.static(staticDist));

//     // 创建端口号
//     app.set("port", options.port);

//     app.listen(port, () => {
//       console.log(
//         `create server at  http://localhost:${port} Worker ${process.pid} started`
//       );
//     });
//   }

//   static runSSRServer(
//     options: AdoNodeOptions,
//     callBack: (app: Express) => void
//   ) {
//     const app: Express = express();
//     // 使用管道
//     if (
//       options.globalPipes &&
//       options.globalPipes.length &&
//       options instanceof Array
//     ) {
//       options.globalPipes.forEach((pipe: any) => {
//         const inst = new pipe();
//         app.use("*", inst.run);
//       });
//     }
//     // 使用JSON
//     app.use(express.json());

//     // 创建Router
//     const { base } = options;
//     const controller = this.createControllers();
//     controller.forEach((el) => {
//       const router = ref.get(el);
//       app.use(base, router);
//     });
//     /**
//      * // if use vite ssr
//      * app.use(express.static("dist/app"));
//      * // create port
//      * app.set("port", options.port);
//      * app.get("*", (_req, res) => {
//      *
//      * // send ssr html
//      * res.sendFile(path.join(__dirname, "app/index.html"));
//      * });
//      * // listen
//      * app.listen(port, () => {
//      *    console.log(
//      *    `create server at  http://localhost:${port} Worker ${process.pid} started`
//      *    );
//      * });
//      */
//     callBack(app);
//   }
// }
// @Controller("/Test1")
// class Test1Controller extends AdoNodeController {}
// @Controller("/Test2")
// class Test2Controller extends AdoNodeController {}
// @Controller("/Test3")
// class Test3Controller extends AdoNodeController {}
// @Controller("/Test4")
// class Test4Controller extends AdoNodeController {}
// @Controller("/Test5")
// class Test5Controller extends AdoNodeController {}

// @Controller("/Test6")
// class Test6Controller extends AdoNodeController {}
// @Controller("/Test7")
// class Test7Controller extends AdoNodeController {}
// @Controller("/Test8")
// class Test8Controller extends AdoNodeController {}
// @Controller("/Test9")
// class Test9Controller extends AdoNodeController {}
// @Controller("/Test10")
// class Test10Controller extends AdoNodeController {}

// @Module({
//   Controller: [Test2Controller, Test1Controller],
//   Provider: [],
// })
// class UserModule {}

// @Module({
//   Controller: [Test5Controller, Test4Controller, Test3Controller],
//   Provider: [UserModule],
// })
// class AppModule {}

// @Module({
//   Controller: [Test8Controller, Test9Controller, Test10Controller],
//   Provider: [],
// })
// class CpuModule {}

// @Module({
//   Controller: [Test6Controller, Test7Controller],
//   Provider: [CpuModule],
// })
// class ComputerModule {}

// @Modules([AppModule, ComputerModule])
// class AdoNodeModulesImpl extends AdoNodeModules {
//   static main() {
//     console.log("hello world");
//   }
// }

// AdoNodeModulesImpl.createControllers();

export { Module, Modules };
