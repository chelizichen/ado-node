import { Request } from "express";
/**
 * @description 使用路由拦截器
 */
declare const UseInterceptor: (fn: AdoNodeInterceptor) => MethodDecorator;
/**
 * @description 路由拦截器接口
 */
interface AdoNodeInterceptor {
    before(req: Request): any;
    hack(req: Request): any;
    after(req: Request): void;
}
export { UseInterceptor };
export type { AdoNodeInterceptor };
