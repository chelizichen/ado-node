import { AdoNodeInterceptor } from "../../../lib/interceptor/interceptor";
import { Request, Response } from "express";
import { AdoNodePipe } from "../../../lib/types";
import { FieldError } from "../../../lib/core";
class UserLogInterceptor implements AdoNodeInterceptor {
  async hack(req: Request, _res: Response) {
    console.log("处理中", !req.headers);
  }
  async after(req: Request, _res: Response) {
    console.log("处理后", !req.headers);
  }

  async before(req: Request, _res: Response) {
    console.log("处理前", req.headers);
    if (!req.headers["token"]) {
      req.headers["token"] =
        "token a5sdimkgdsa2134ij213saklnbgjoasjdaskjdal1231";
    }
    _res.json(req.headers);
  }
}

class UserLogPipe implements AdoNodePipe {
  async run(req: Request, res: Response) {
    if (!req.query.id) {
      res.json(new FieldError("没有 ID "));
    } else {
      req.query.id = "22";
    }
  }
}

export { UserLogInterceptor, UserLogPipe };
