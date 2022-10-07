import { RedisClientType } from "redis";
import { Controller, UseCache, HandleController, Get } from "../../../index";
import { commonClass } from "../../config/common";

@Controller("/app106")
class App106Controller extends HandleController {
  @UseCache("redis", commonClass)
  Redis!: RedisClientType;

  @Get("/test")
  async getVal() {
    return await this.Redis.get("sk:001911:qt");
  }
}

export { App106Controller };
