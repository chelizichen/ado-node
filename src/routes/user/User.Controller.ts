import {
  Controller,
  HandleController,
  Inject,
  UseCache,
  Curd,
  Get,
  CODE,
  UsePipe,
  Query,
} from "ado-node";
import { RedisClientType } from "redis";
import { CONSTANT } from "../../config/constant";
import { UserIdPipe } from "../../pipe/User.pipe";
import { User } from "./User.Enity";
import { UserService } from "./User.Service";
@Controller("/user")
class UserController extends HandleController {
  @Inject(UserService)
  UserService!: UserService;
  @UseCache(CONSTANT.REDIS)
  Redis!: RedisClientType;

  @UsePipe(new UserIdPipe())
  @Get("/getUser")
  async getUser(@Query() query: any) {
    return {
      data: query.id,
      code: CODE.SUCCESS,
    };
  }

  @Curd("/curd", User, [CONSTANT.MYSQL, CONSTANT.REDIS])
  public async CurdUser() {}
}

export { UserController };
