import { AdoNodeInterceptor } from "../../../lib/interceptor/interceptor";
import { Request, Response } from "express";
import { AdoNodePipe } from "../../../lib/types";
import { FieldError } from "../../../lib/core";
import { AdoNodeControllerInterceptor } from "../../../lib/interceptor/global";
class UserLogInterceptor implements AdoNodeInterceptor {
  async hack(req: Request, _res: Response) {
    if (req.closed) {
      return;
    }
    console.log("处理中", req.headers["token"]);
  }
  async after(req: Request, _res: Response) {
    if (req.closed) {
      return;
    }
    console.log("处理后", req.headers["token"]);
  }

  async before(req: Request, res: Response) {
    console.log("处理前", req.headers["token"]);
    if (!req.headers["token"]) {
      req.headers["token"] =
        "token a5sdimkgdsa2134ij213saklnbgjoasjdaskjdal1231";
      res.json(new FieldError("缺少token"));
    }
  }
}

class UserControllerInterceptor implements AdoNodeControllerInterceptor {
  async before(req: Request, _res: Response) {
    console.log("控制层 拦截前", req.headers);
  }
  async after(req: Request, _res: Response) {
    console.log("控制层 拦截后", req.headers);
  }
}

class UserLogPipe implements AdoNodePipe {
  async run(req: Request, res: Response) {
    if (!req.query.id) {
      res.json(new FieldError("没有 ID "));
      return true;
    } else {
      req.query.id = "22";
    }
    return false;
  }
}

export { UserLogInterceptor, UserLogPipe, UserControllerInterceptor };
