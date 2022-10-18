import { Request, Response } from "express";
declare const UseInterceptor: (fn: AdoNodeInterceptor) => MethodDecorator;
interface AdoNodeInterceptor {
    before(req: Request, res: Response): Promise<any>;
    hack(req: Request, res: Response): Promise<any>;
    after(req: Request, res: Response): Promise<any>;
}
export { UseInterceptor };
export type { AdoNodeInterceptor };
