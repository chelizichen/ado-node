import { Response, NextFunction } from "express";
import { Query } from "../../../index.d";
import { AdoNodePipe, validate } from "../../../lib/pipe/pipe";
import { user } from "./App917.enity";
export class UserNamePipe implements AdoNodePipe<Query<user>> {
  run(context: {
    req: Query<user>;
    res: Response<any, Record<string, any>>;
    next: NextFunction;
  }) {
    let inst = new user();
    const merge = Object.assign(inst, context.req.query);
    const isError = validate(merge);
    if (isError !== true) {
      return isError;
    }
    return context;
  }
}
// export function useIdPipe(req: Query<{ id: number }>) {
//   if (req.query.id > 20) {
//     throw new Error("id 值不能大于 20");
//   }
//   return;
// }

// export function userNamePipe(req: Query<{ name: string }>) {
//   if (!req.query.name) {
//     throw new Error("name 不嫩为空");
//   }
//   return;
// }
