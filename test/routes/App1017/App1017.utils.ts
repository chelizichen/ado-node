import { AdoNodeInterceptor } from "../../../lib/interceptor/interceptor";
import { Request } from "express";
import { AdoNodePipe } from "../../../lib/types";
import { AdoNodeControllerInterceptor } from "../../../lib/interceptor/global";
class UserLogInterceptor implements AdoNodeInterceptor {
  async hack(req: Request) {
    if (req.closed) {
      return;
    }
    console.log("处理中", req.headers["token"]);
  }
  async after(req: Request) {
    if (req.closed) {
      return;
    }
    console.log("处理后", req.headers["token"]);
  }

  async before(req: Request) {
    console.log("处理前", req.headers["token"]);
    if (!req.headers["token"]) {
      req.headers["token"] =
        "token a5sdimkgdsa2134ij213saklnbgjoasjdaskjdal1231";
    }
  }
}

class UserControllerInterceptor implements AdoNodeControllerInterceptor {
  async before(req: Request) {
    console.log("控制层 拦截前", req.headers);
  }
  async after(req: Request) {
    console.log("控制层 拦截后", req.headers);
  }
}

class UserLogPipe implements AdoNodePipe {
  async run(req: Request) {
    if (!req.query.id) {
      return new Error("没有ID");
    } else {
      req.query.id = "22";
    }
    return;
  }
}

export { UserLogInterceptor, UserLogPipe, UserControllerInterceptor };
