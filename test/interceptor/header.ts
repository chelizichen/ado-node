import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ClientError, FieldError } from "../../lib/core";
import { AdoNodeInterceptor } from "../../lib/interceptor/interceptor";

export class TokenInterceptor implements AdoNodeInterceptor{
  before(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) {
    // throw new Error("Method not implemented.");  
    if (!req.headers.token) {
      return new ClientError("没有权限")
    }
    return
  }
  hack(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) {
    if (!req.query.id) {
      return new FieldError("没有ID");
    }
    return; 
  }
  after(_req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): void {
    // throw new Error("Method not implemented.");
  }
  
}