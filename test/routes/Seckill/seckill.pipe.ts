import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { validate } from "../../../lib/core";
import { class_transform } from "../../../lib/pipe/tansformer";
import { AdoNodePipe } from "../../../lib/types";
import { Seckill } from './seckill.enity';

export class TestValidatePipe implements AdoNodePipe{
  run(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) {
    const hasError = validate(Seckill, req.body)
    if (hasError instanceof Error) {
      return hasError;
    } else {
      req.body = class_transform.plainToClass(Seckill, req.body);
      return;
    }
  }
}

