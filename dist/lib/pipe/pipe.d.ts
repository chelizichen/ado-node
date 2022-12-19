/**
 * @Author chelizichen
 * @interface AdoNodePipe
 * @use 在代码进入进入控制层时进行判断 参数校验 另外的逻辑判断
 * @params context
 */
import { NextFunction, Response, Request } from "express";
import { FieldError } from "../error/field";
interface AdoNodePipe {
    run(req: Request): any;
}
declare const UsePipe: (fn: AdoNodePipe) => MethodDecorator;
declare function validate(Proto: new (...args: any[]) => void, inst: Record<string, any>): FieldError | undefined;
interface AdoNodeGlobalPipe {
    run(req: Request, res: Response, next: NextFunction): void;
}
export { UsePipe, validate };
export type { AdoNodePipe, AdoNodeGlobalPipe };
