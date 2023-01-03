import { ref } from "../ioc";
import { Request } from "express";

/**
 * @description 使用路由拦截器
 */
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

/**
 * @description 路由拦截器接口
 */
interface AdoNodeInterceptor {
  before(req: Request):any;
  hack(req: Request): any;
  after(req: Request): void;
}

export { UseInterceptor };

export type { AdoNodeInterceptor };
