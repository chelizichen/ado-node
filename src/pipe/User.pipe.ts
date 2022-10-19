import { TypesError } from "ado-node";
import { AdoNodeGlobalPipe, AdoNodePipe } from "ado-node/index.d";
import { Request, Response, NextFunction } from "express";
class UserInfoPipe implements AdoNodeGlobalPipe {
  // @ts-ignore
  run(req: Request, res: Response, next: NextFunction): void | Error {
    next();
  }
}
class UserIdPipe implements AdoNodePipe {
  async run(req: Request) {
    const id = req.query.id as unknown as number;
    if (id) {
      if (isNaN(id)) {
        return new TypesError("id 必须为数字");
      }
    }
    return;
  }
}

export { UserInfoPipe, UserIdPipe };
