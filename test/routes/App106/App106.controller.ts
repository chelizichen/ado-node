import { RedisClientType } from "redis";
import {
  Controller,
  UseCache,
  HandleController,
  Get,
  Inject,
} from "../../../index";
import { Goods } from "./App106.enity";

@Controller("/app106")
class App106Controller extends HandleController {
  @UseCache("redis")
  Redis!: RedisClientType;

  @Inject(Goods)
  Goods!: Goods;

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

  @Get("/testEnity")
  async testEnity() {
    // const inst = new Goods()

    const data = await this.Goods.save({
      g_name: "123",
    });
    return {
      data,
      code: 0,
      msg: "ok",
    };
  }
}

export { App106Controller };
