// 整个路由匹配拦截
// 拦截器会在守卫之后执行
// 单独路由拦截
import { ref } from "../ioc";
import { Request } from "express";
interface AdoNodeControllerInterceptor {
  before?(req: Request): Promise<any>;
  after?(req: Request): Promise<any>;
}
const UseControllerInterceptor = (
  fn: AdoNodeControllerInterceptor
): ClassDecorator => {
  return function (target: Function) {
    ref.def(target.name, fn, target.prototype, ":ControllerInterceptor");
  };
};
export type { AdoNodeControllerInterceptor };
export { UseControllerInterceptor };
