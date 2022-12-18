/**
 * @Author chelizichen 
 * @description  DI 的 实现
 */

import "reflect-metadata";
import { ref } from "./ref";
const Inject = (InjectTarget: Function): PropertyDecorator => {
  return function (target: Object, propertyKey: string | symbol) {
    const Service = ref.get(InjectTarget);
    target.constructor.prototype[propertyKey] = Service;
  };
};

const Collect = (): ClassDecorator => {
  return function (target: Function) {
    ref.def(target, target.prototype);
  };
};

export { Inject, Collect };
