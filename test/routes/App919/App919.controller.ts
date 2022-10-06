import { Controller, Get, HandleController } from "../../../index";
import { UseCache } from "../../../lib/handle.cache";
import { Curd } from "../../../lib/handle.curd";
import { coon } from "../App917/App917.controller";
import { Fund_Star } from "./App919.enity";
import { createClient, RedisClientType } from "redis";

@Controller("/app919")
class App919Controller extends HandleController {
  @UseCache(createClient())
  Redis!: RedisClientType;
  @Get("/a1")
  public async a1() {}
  @Curd("/fund", Fund_Star, coon)
  public async fundCurd() {}
}

export { App919Controller };
