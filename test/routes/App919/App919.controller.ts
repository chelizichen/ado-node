import {
  Controller,
  Get,
  HandleController,
  Inject,
  UseCache,
} from "../../../index";
import { RedisClientType } from "redis";
import { App919Service } from "./App919.service";
import { Ret } from "../App917/App917.enity";
import { Fund_Star } from "./App919.enity";

@Controller("/app919")
class App919Controller extends HandleController {
  @UseCache("redis")
  Redis!: RedisClientType;

  @Inject(App919Service)
  App919Service!: App919Service;

  @Inject(Fund_Star)
  Fund_Star!: Fund_Star;

  @Get("/useConfig")
  public async testUse() {
    return Ret.Message(0, "ok", "data");
  }

  @Get("/testgetList")
  async testEnity() {
    const data = await this.Fund_Star.getList();
    return {
      data,
      code: 0,
      msg: "ok",
    };
  }

  @Get("/testgetOne")
  async testGetOne() {
    const id = 777;
    const data = await this.Fund_Star.getOneBy(id);
    return {
      data,
      code: 0,
      msg: "ok",
    };
  }

  @Get("/testcountBy")
  async countBy() {
    const data = await this.Fund_Star.countBy({
      fund_manager: "何家琪",
      // fund_company: "华夏基金",
    });
    return {
      data,
      code: 0,
      msg: "ok",
    };
  }

  // @Get("/a1")
  // public async a1() {
  //   return await this.App919Service.a1();
  // }
}

export { App919Controller };
