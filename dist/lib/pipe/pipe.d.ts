import { NextFunction, Response, Request } from "express";
import { FieldError } from "../error/field";
declare const UsePipe: (fn: AdoNodePipe) => MethodDecorator;
/**
 * @interface AdoNodePipe
 * @use 在代码进入进入控制层时进行判断 参数校验 另外的逻辑判断
 * @params context
 */
interface AdoNodePipe {
    run(req: Request): Promise<any>;
}
declare function validate(inst: any): true | FieldError;
interface AdoNodeGlobalPipe {
    run(req: Request, res: Response, next: NextFunction): void;
}
export { UsePipe, validate };
export type { AdoNodePipe, AdoNodeGlobalPipe };
