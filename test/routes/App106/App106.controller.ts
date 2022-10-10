import { RedisClientType } from "redis";
import { Controller, UseCache, HandleController, Get } from "../../../index";
import { UseConfig } from "../../../lib/store/config";
import { commonClass } from "../../config/common";

@Controller("/app106")
@UseConfig(commonClass)
class App106Controller extends HandleController {
  @UseCache("redis")
  Redis!: RedisClientType;

  @Get("/test")
  async getVal() {
    return await this.Redis.get("sk:001911:qt");
  }
  @Get("/testRedis")
  async getTestRedis() {
    return {
      data: "ok",
      code: 0,
    };
  }
}

export { App106Controller };
