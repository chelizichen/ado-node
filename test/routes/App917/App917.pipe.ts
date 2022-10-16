import { Response, NextFunction } from "express";
import { Query } from "../../../index.d";
import { AdoNodePipe, validate } from "../../../lib/pipe/pipe";
import { User } from "./App917.enity";
export class UserNamePipe implements AdoNodePipe<Query<User>> {
  run(context: {
    req: Query<User>;
    res: Response<any, Record<string, any>>;
    next: NextFunction;
  }) {
    let inst = new User();
    const merge = Object.assign(inst, context.req.query);
    const isError = validate(merge);
    if (isError !== true) {
      return isError;
    }
    return context;
  }
}
