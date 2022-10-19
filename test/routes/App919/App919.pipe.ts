import { FieldError } from "../../../lib/core";
import { AdoNodePipe } from "../../../lib/types";

class FundCodePipe implements AdoNodePipe {
  async run(req: any) {
    if (!req.query.fundcode) {
      return new FieldError("没有 fundcode 参数");
    }
    return;
  }
}

export { FundCodePipe };
