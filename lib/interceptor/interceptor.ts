import { ref } from "../ioc";

import { Request } from "express";
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
  before(req: Request):any;
  hack(req: Request): any;
  after(req: Request): void;
}

export { UseInterceptor };

export type { AdoNodeInterceptor };
