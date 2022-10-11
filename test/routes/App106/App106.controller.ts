import { RedisClientType } from "redis";
import {
  Controller,
  UseCache,
  HandleController,
  Get,
  Inject,
} from "../../../index";
import { App106Enity } from "./App106.enity";

@Controller("/app106")
class App106Controller extends HandleController {
  @UseCache("redis")
  Redis!: RedisClientType;

  @Inject(App106Enity)
  App106Enity!: App106Enity;

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
    this.App106Enity.getList();
    return {
      data: "ok",
      code: 0,
    };
  }
}

export { App106Controller };
