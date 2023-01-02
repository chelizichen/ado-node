/**
 * @Author chelizichen 
 * @description  DI 的 实现
 */

// @Controller("/user")
// class UserController extends AdoNodeController{
//   @Inject(UserService)
//   UserService!: UserService;

// }

// @Collect()
// class UserService{

// }

import "reflect-metadata";
import { ref } from "./ref";
const Inject = (InjectTarget: Function): PropertyDecorator => {
  return function (target: Object, propertyKey: string | symbol) {
    let Service = ref.get(InjectTarget);
    target.constructor.prototype[propertyKey] = Service;
  };
};

const Collect = (): ClassDecorator => {
  return function (target: Function) {
    ref.def(target, target.prototype);
  };
};

export { Inject, Collect };
