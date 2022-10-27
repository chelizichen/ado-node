"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modules = exports.Module = void 0;
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
const core_1 = require("../core");
const Module = (AdoNodeOptions) => {
    return function (target) {
        core_1.ref.def(target.name, AdoNodeOptions.Controller, target.prototype, ":controller");
        core_1.ref.def(target.name, AdoNodeOptions.Provider, target.prototype, ":provider");
        core_1.ref.def(target.name, true, target.prototype, ":module");
    };
};
exports.Module = Module;
const Modules = (modules) => {
    modules.Modules.forEach((el) => {
        const isModule = core_1.ref.get(el.name, el.prototype, ":module");
        if (!isModule) {
            throw new Error(`${el.name} is Not a Moudle`);
        }
    });
    return function () {
        core_1.ref.def(core_1.AdoNodeServer.name, modules.Modules, core_1.AdoNodeServer.prototype, ":modules");
        core_1.ref.def(core_1.AdoNodeServer.name, modules.Base, core_1.AdoNodeServer.prototype, ":base");
        core_1.ref.def(core_1.AdoNodeServer.name, modules.GlobalPipes, core_1.AdoNodeServer.prototype, ":globalPipes");
        core_1.ref.def(core_1.AdoNodeServer.name, modules.Port, core_1.AdoNodeServer.prototype, ":port");
        core_1.ref.def(core_1.AdoNodeServer.name, modules.Cluster, core_1.AdoNodeServer.prototype, ":cluster");
    };
};
exports.Modules = Modules;
//# sourceMappingURL=module.js.map