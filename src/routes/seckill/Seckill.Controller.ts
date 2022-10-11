import { Controller, HandleController, Inject, Post, UseCache } from "ado-node";
import { RedisClientType } from "redis";
import { CONSTANT } from "../../config/constant";
import { Ret } from "../../config/ret";
import { SeckillService } from "./Seckill.Service";
import { Body } from "ado-node/index.d";

@Controller("/prod")
export class SeckillController extends HandleController {
  @UseCache(CONSTANT.REDIS)
  REDIS!: RedisClientType;
  @Inject(SeckillService)
  SeckillService!: SeckillService;

  @Post("/seckill")
  public async SecKill(
    req: Body<{ uId: string; proId: string }>,
    _res: Response
  ) {
    if (!this.REDIS.isOpen) {
      await this.REDIS.connect();
    }
    const body = req.body;
    const getRest = await this.SeckillService.getRestKey(
      this.REDIS,
      body.proId
    );
    const getUserKey = `sk:${req.body.uId}:user`;
    if (getRest.total === null) {
      return {
        msg: "还没开始",
      };
    }
    const hasMember = await this.REDIS.sIsMember(getUserKey, body.uId);
    if (hasMember) {
      return {
        msg: "您已秒杀成功，不能重复操作",
      };
    }
    if (getRest.total <= 0) {
      return {
        msg: "已无库存",
      };
    }
    if (getRest.total >= 1) {
      await this.REDIS.decr(getRest.key);
      await this.REDIS.sAdd(getUserKey, body.uId);
      return {
        msg: "秒杀成功",
      };
    }
    return Ret.Message(0, "success", "data");
  }

  @Post("/addProd")
  public async addProd(
    req: Body<{ proId: string; total: string }>,
    _res: Response
  ) {
    if (!this.REDIS.isOpen) {
      await this.REDIS.connect();
    }
    const key = `sk:${req.body.proId}:qt`;
    await this.REDIS.set(key, req.body.total);
    return {
      msg: "设置成功",
    };
  }
}
