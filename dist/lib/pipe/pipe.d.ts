import { NextFunction, Response, Request } from "express";
import { FieldError } from "../error/field";
declare const UsePipe: <T extends unknown>(fn: AdoNodePipe<T>) => MethodDecorator;
/**
 * @interface AdoNodePipe
 * @use 在代码进入进入控制层时进行判断 参数校验 另外的逻辑判断
 * @params context
 */
declare type context<T> = {
    req: T;
    res: Response;
    next: NextFunction;
};
interface AdoNodePipe<T> {
    run(context: context<T>): context<any> | Error;
}
export declare function validate(inst: any): true | FieldError;
interface AdoNodeGlobalPipe {
    run(req: Request, res: Response, next: NextFunction): void | Error;
}
export { UsePipe };
export type { AdoNodePipe, AdoNodeGlobalPipe };
