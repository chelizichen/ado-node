import { Request, Response } from "express";
interface AdoNodeControllerInterceptor {
    before(req: Request, res: Response): Promise<any>;
    after(req: Request, res: Response): Promise<any>;
}
declare const UseControllerInterceptor: (fn: AdoNodeControllerInterceptor) => ClassDecorator;
export type { AdoNodeControllerInterceptor };
export { UseControllerInterceptor };
