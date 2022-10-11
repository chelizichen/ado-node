import { RedisClientType } from "@redis/client";
import { Controller, Get, HandleController, Inject, UseCache } from "ado-node";
import { CONSTANT } from "../../config/constant";
import { Ret } from "../../config/ret";
import { GoodsService } from "./Goods.Service";

@Controller("/goods")
export class GoodsController extends HandleController {
  @UseCache(CONSTANT.REDIS)
  REDIS!: RedisClientType;

  @Inject(GoodsService)
  GoodsService!: GoodsService;

  @Get("/TestAddGoods")
  public async TestAddGoods() {
    const data = await this.GoodsService.TestAddGoods();
    return Ret.Message(0, "ok", data);
  }

  @Get("/list")
  public async List() {
    const data = await this.GoodsService.List();
    return Ret.Message(0, "ok", data);
  }
}
