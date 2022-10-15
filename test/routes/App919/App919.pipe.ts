import { Response, NextFunction } from "express";
import { FieldError } from "../../../lib/core";
import { AdoNodePipe } from "../../../lib/types";

class FundCodePipe implements AdoNodePipe<any> {
  run(context: {
    req: any;
    res: Response<any, Record<string, any>>;
    next: NextFunction;
  }):
    | Error
    | {
        req: any;
        res: Response<any, Record<string, any>>;
        next: NextFunction;
      } {
    if (context.req.query.fundcode) {
      context.next();
    } else {
      return new FieldError("没有 fundcode 参数");
    }
    return context;
  }
}

export { FundCodePipe };
