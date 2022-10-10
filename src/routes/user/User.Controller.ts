import {
  Controller,
  HandleController,
  Inject,
  UseCache,
  Curd,
  Get,
  CODE,
  Pipe,
  UseConfig,
} from "ado-node";
import { Query } from "ado-node/index.d";
import { RedisClientType } from "redis";
import { CommonClass } from "../../config/common";
import { CONSTANT } from "../../config/constant";
import { User } from "./User.Enity";
import { UserIdPipe } from "./User.pipe";
import { UserService } from "./User.Service";
@Controller("/user")
@UseConfig(CommonClass)
class UserController extends HandleController {
  @Inject(UserService)
  UserService!: UserService;
  @UseCache(CONSTANT.REDIS)
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

  @Curd("/curd", User, [CONSTANT.MYSQL, CONSTANT.REDIS])
  public async CurdUser() {}
}

export { UserController };
