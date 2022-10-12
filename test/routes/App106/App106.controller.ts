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
    const inst = new Goods();
    inst.g_name = "测试名字";
    inst.g_type = "测试类型";
    inst.g_price = "666";
    const data = await this.Goods.save(inst);
    return {
      data,
      code: 0,
      msg: "ok",
    };
  }
}

export { App106Controller };
