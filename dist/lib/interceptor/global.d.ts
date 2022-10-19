import { Request } from "express";
interface AdoNodeControllerInterceptor {
    before?(req: Request): Promise<any>;
    after?(req: Request): Promise<any>;
}
declare const UseControllerInterceptor: (fn: AdoNodeControllerInterceptor) => ClassDecorator;
export type { AdoNodeControllerInterceptor };
export { UseControllerInterceptor };
