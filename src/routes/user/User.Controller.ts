import {
  Controller,
  HandleController,
  Inject,
  UseCache,
  Curd,
  Get,
  CODE,
  Pipe,
} from "ado-node";
import { Query } from "ado-node/lib/types";
import * as mysql from "mysql";
import { RedisClientType } from "redis";
import { CommonClass } from "../../config/common";
import { CONSTANT } from "../../config/constant";
import { User } from "./User.Enity";
import { UserIdPipe } from "./User.pipe";
import { UserService } from "./User.Service";
const config = {
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "boot", //所用数据库
  port: "3306",
};
export const coon = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  multipleStatements: true,
});

@Controller("/user")
class UserController extends HandleController {
  @Inject(UserService)
  UserService!: UserService;
  @UseCache(CONSTANT.REDIS, CommonClass)
  Redis!: RedisClientType;

  @Get("/getUser")
  @Pipe([UserIdPipe])
  async getUser(req: Query<{ id: number }>, _res: Response) {
    let data = await this.UserService.getList(req.query.id);
    return {
      data,
      code: CODE.SUCCESS,
    };
  }

  @Curd("/curd", User, [CONSTANT.MYSQL, CONSTANT.REDIS], CommonClass)
  public async CurdUser() {}
}

export { UserController };
