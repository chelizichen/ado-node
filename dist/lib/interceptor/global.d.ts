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
declare const UseControllerInterceptor: (fn: AdoNodeControllerInterceptor) => ClassDecorator;
export type { AdoNodeControllerInterceptor };
export { UseControllerInterceptor };
