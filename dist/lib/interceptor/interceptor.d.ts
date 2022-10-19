import { Request } from "express";
declare const UseInterceptor: (fn: AdoNodeInterceptor) => MethodDecorator;
interface AdoNodeInterceptor {
    before(req: Request): Promise<any>;
    hack(req: Request): Promise<any>;
    after(req: Request): Promise<any>;
}
export { UseInterceptor };
export type { AdoNodeInterceptor };
