import { ref, CONSTANT } from "../core";
import { OberServer } from "../ober/oberserver";

export const Config: ClassDecorator = (target: Function) => {
  let OberInst = ref.get(CONSTANT.Observer, OberServer.prototype) as OberServer;
  if (!OberInst) {
    OberInst = new OberServer();
    ref.def(CONSTANT.Observer, OberInst, OberServer.prototype);
  }
  OberInst.set(CONSTANT.Config, target);
};

export const UseConfig = (ConfigClass: Function): ClassDecorator => {
  return function (target: Function) {
    ref.def(ConfigClass.name, ConfigClass.prototype, target.prototype);
  };
};
