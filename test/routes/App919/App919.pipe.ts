import { Response } from "express";
import { FieldError } from "../../../lib/core";
import { AdoNodePipe } from "../../../lib/types";

class FundCodePipe implements AdoNodePipe {
  async run(req: any, res: Response) {
    if (!req.query.fundcode) {
      res.json(new FieldError("没有 fundcode 参数"));
    }
  }
}

export { FundCodePipe };
