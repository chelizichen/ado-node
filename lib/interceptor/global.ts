import { ref } from "../ioc";
import { Request } from "express";

/**
 * @description 控制层拦截器
 */
interface AdoNodeControllerInterceptor {
  before?(req: Request): Promise<any>;
  after?(req: Request): Promise<any>;
}
/**
 * @description 使用控制层拦截器
 */
const UseControllerInterceptor = (
  fn: AdoNodeControllerInterceptor
): ClassDecorator => {
  return function (target: Function) {
    ref.def(target.name, fn, target.prototype, ":ControllerInterceptor");
  };
};
export type { AdoNodeControllerInterceptor };
export { UseControllerInterceptor };
