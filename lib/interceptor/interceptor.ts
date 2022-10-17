import { ref } from "../core";
import { Request, Response } from "express";
// 整个路由匹配拦截
// 拦截器会在守卫之后执行
// 单独路由拦截

const UseInterceptor = (fn: AdoNodeInterceptor): MethodDecorator => {
  return function (target: Object, propertyKey: string | symbol) {
    ref.def(
      propertyKey as string,
      fn,
      target.constructor.prototype,
      ":interceptor"
    );
  };
};

interface AdoNodeInterceptor {
  before(req: Request, res: Response): Promise<any>;
  hack(req: Request, res: Response): Promise<any>;
  after(req: Request, res: Response): Promise<any>;
}

export { UseInterceptor };

export type { AdoNodeInterceptor };
