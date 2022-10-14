import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { AdoNodeGlobalPipe } from "../../../lib/pipe/pipe";

export class TestGlobalPipe implements AdoNodeGlobalPipe {
  run(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): void {
    console.log("req.query", req.query);
    console.log(!req.body);
    console.log(!res);
    next();
  }
}
