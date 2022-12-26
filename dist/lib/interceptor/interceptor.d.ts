import { Request } from "express";
declare const UseInterceptor: (fn: AdoNodeInterceptor) => MethodDecorator;
interface AdoNodeInterceptor {
    before(req: Request): any;
    hack(req: Request): any;
    after(req: Request): void;
}
export { UseInterceptor };
export type { AdoNodeInterceptor };
