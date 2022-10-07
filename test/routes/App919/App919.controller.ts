import {
  Controller,
  Get,
  HandleController,
  Inject,
  UseCache,
} from "../../../index";
import { RedisClientType } from "redis";
import { commonClass } from "../../config/common";
import { App919Service } from "./App919.service";

@Controller("/app919")
class App919Controller extends HandleController {
  @UseCache("redis", commonClass)
  Redis!: RedisClientType;
  @Inject(App919Service)
  App919Service!: App919Service;
  @Get("/a1")
  public async a1() {
    return await this.App919Service.a1();
  }
}

export { App919Controller };
