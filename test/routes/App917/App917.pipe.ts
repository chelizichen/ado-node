import { Response, Request } from "express";
import { AdoNodePipe, validate } from "../../../lib/pipe/pipe";
import { User } from "./App917.enity";
export class UserNamePipe implements AdoNodePipe {
  async run(req: Request, res: Response) {
    let inst = new User();
    const merge = Object.assign(inst, req.query);
    const isError = validate(merge);
    if (isError !== true) {
      res.json(isError);
      return true;
    }
    return false;
  }
}
