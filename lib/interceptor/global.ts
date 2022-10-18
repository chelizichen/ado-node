// 整个路由匹配拦截
// 拦截器会在守卫之后执行
// 单独路由拦截
import { ref } from "../core";
import { Request, Response } from "express";
interface AdoNodeControllerInterceptor {
  before(req: Request, res: Response): Promise<any>;
  after(req: Request, res: Response): Promise<any>;
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
