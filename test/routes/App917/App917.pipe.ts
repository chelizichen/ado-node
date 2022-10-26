import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { FieldError } from "../../../lib/core";
import { AdoNodeControllerInterceptor } from "../../../lib/interceptor/global";
import { AdoNodePipe, validate } from "../../../lib/pipe/pipe";
import { User } from "./App917.enity";
export class UserNamePipe implements AdoNodePipe {
  async run(req: Request) {
    const isError = validate(User, req.body);
    if (isError !== true) {
      return isError;
    }
    return;
  }
}
export class UserIdPipe implements AdoNodePipe {
  async run(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>
  ) {
    if (!req.query.id) {
      return new FieldError("没有id");
    }
    return;
  }
}

export class UserInfoInterceptor implements AdoNodeControllerInterceptor {
  async before(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>
  ) {
    const user = req.body;
    if (user.username === "leemulus" && user.password === "123456") {
      return req.body;
    }
    return;
    // res.json(req.body);
  }
}
