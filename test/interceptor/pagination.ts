import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { FieldError } from "../../lib/core";
import { AdoNodeInterceptor } from "../../lib/interceptor/interceptor";

export class Pagination implements AdoNodeInterceptor {
  before(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>
  ) {
    if (req.query.page && req.query.size) {
      return;
    } else {
      return new FieldError("没有分页的参数");
    }
  }
  hack(
    _req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>
  ) {
    // console.log(req.query);
  }
  after(
    _req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>
  ): void {
    // console.log(req.cookies);
  }
}
