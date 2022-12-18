import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { class_transform } from "../../../lib/pipe/tansformer";
import { AdoNodePipe } from "../../../index.d";
import { Goods } from "./goods.enity";

export class plainToGoods implements AdoNodePipe {
  run(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) {
    const body = class_transform.plainToClass(Goods, req.body);
    req.body = body;
  }
}

