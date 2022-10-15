import { ref, CONSTANT } from "../core";
import { OberServer } from "../ober/oberserver";
import { ClassConstructor } from "../types";

const Config: ClassDecorator = (target: Function) => {
  let OberInst = ref.get(CONSTANT.Observer, OberServer.prototype) as OberServer;
  if (!OberInst) {
    OberInst = new OberServer();
    ref.def(CONSTANT.Observer, OberInst, OberServer.prototype);
  }
  OberInst.set(CONSTANT.Config, target);
};

const AdoNodeConfig = (ConfigClass: ClassConstructor): ClassDecorator => {
  return function () {
    const config_inst = new ConfigClass();
    let OberInst = ref.get(
      CONSTANT.Observer,
      OberServer.prototype
    ) as OberServer;
    if (!OberInst) {
      OberInst = new OberServer();
      ref.def(CONSTANT.Observer, OberInst, OberServer.prototype);
    }
    OberInst.set(CONSTANT.Config_INST, config_inst);
  };
};

const useConfig = <T extends any>() => {
  let OberInst = ref.get(CONSTANT.Observer, OberServer.prototype) as OberServer;

  return OberInst.get(CONSTANT.Config_INST)?.value as T;
};

export { useConfig, Config, AdoNodeConfig };
