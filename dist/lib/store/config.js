"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdoNodeConfig = exports.Config = exports.useConfig = void 0;
const core_1 = require("../core");
const oberserver_1 = require("../ober/oberserver");
// Config 绑入原型链
const Config = (target) => {
    let OberInst = core_1.ref.get(core_1.CONSTANT.Observer, oberserver_1.OberServer.prototype);
    if (!OberInst) {
        OberInst = new oberserver_1.OberServer();
        core_1.ref.def(core_1.CONSTANT.Observer, OberInst, oberserver_1.OberServer.prototype);
    }
    OberInst.set(core_1.CONSTANT.Config, target);
};
exports.Config = Config;
// Config_Inst 特定情况下使用
const AdoNodeConfig = (ConfigClass) => {
    return function () {
        const config_inst = new ConfigClass();
        let OberInst = core_1.ref.get(core_1.CONSTANT.Observer, oberserver_1.OberServer.prototype);
        if (!OberInst) {
            OberInst = new oberserver_1.OberServer();
            core_1.ref.def(core_1.CONSTANT.Observer, OberInst, oberserver_1.OberServer.prototype);
        }
        OberInst.set(core_1.CONSTANT.Config_INST, config_inst);
    };
};
exports.AdoNodeConfig = AdoNodeConfig;
const useConfig = () => {
    let OberInst = core_1.ref.get(core_1.CONSTANT.Observer, oberserver_1.OberServer.prototype);
    return OberInst.get(core_1.CONSTANT.Config_INST)?.value;
};
exports.useConfig = useConfig;
//# sourceMappingURL=config.js.map