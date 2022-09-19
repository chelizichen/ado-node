import "reflect-metadata";
import { ref } from "./handle.reflect";

/**
 * @description 在 Controller 层自动注入方法
 * @realize -- 在原型链上注入
 */
export const Inject = (InjectTarget: Function): PropertyDecorator => {
  return function (target: Object, propertyKey: string | symbol) {
    const Service = ref.get(InjectTarget);
    target.constructor.prototype[propertyKey] = Service;
  };
};

export const Collect = (): ClassDecorator => {
  return function (target: Function) {
    ref.def(target, target.prototype);
  };
};
