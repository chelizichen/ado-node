import { Controller } from "../../../dist";
import { UseCache } from "../../../lib/handle.cache";
import { HandleController } from "../../../lib/handle.class";
import { createClient, RedisClientType } from "redis";
import { Get } from "../../../dist";

@Controller("/app106")
class App106Controller extends HandleController {
  @UseCache(createClient())
  Redis!: RedisClientType;

  @Get("/test")
  async getVal() {
    return await this.Redis.get("sk:001911:qt");
  }
}

export { App106Controller };
