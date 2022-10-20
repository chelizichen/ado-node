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

  @Get("/hello")
  async hello() {
    return await {
      data: "AdoNodeSSR-React",
    };
  }
  @Get("/author")
  async author() {
    return await {
      data: "Chelizichen",
    };
  }

  @Get("/list")
  async getList() {
    return await this.UserService.List();
  }
  @Curd("/curd", User, [CONSTANT.MYSQL, CONSTANT.REDIS])
  public async CurdUser() {}
}

export { UserController };
