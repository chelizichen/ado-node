"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modules = exports.Module = void 0;
const index_1 = require("../../index");
// @Module({
// 	Controller:[],
// 	Provider:[CPUModule,DisplayModule,CacheModule,DiskModule]
// })
// class ComputerModule{}
const Module = (AdoNodeOptions) => {
    return function (target) {
        index_1.ref.def(target.name, AdoNodeOptions.Controller, target.prototype, ":controller");
        index_1.ref.def(target.name, AdoNodeOptions.Provider, target.prototype, ":provider");
        index_1.ref.def(target.name, true, target.prototype, ":module");
    };
};
exports.Module = Module;
const Modules = (modules) => {
    modules.Modules.forEach((el) => {
        const isModule = index_1.ref.get(el.name, el.prototype, ":module");
        if (!isModule) {
            throw new Error(`${el.name} is Not a Moudle`);
        }
    });
    return function () {
        index_1.ref.def(index_1.AdoNodeServer.name, modules.Modules, index_1.AdoNodeServer.prototype, ":modules");
        index_1.ref.def(index_1.AdoNodeServer.name, modules.Base, index_1.AdoNodeServer.prototype, ":base");
        index_1.ref.def(index_1.AdoNodeServer.name, modules.GlobalPipes, index_1.AdoNodeServer.prototype, ":globalPipes");
        index_1.ref.def(index_1.AdoNodeServer.name, modules.Port, index_1.AdoNodeServer.prototype, ":port");
        index_1.ref.def(index_1.AdoNodeServer.name, modules.Cluster, index_1.AdoNodeServer.prototype, ":cluster");
    };
};
exports.Modules = Modules;
//# sourceMappingURL=module.js.map