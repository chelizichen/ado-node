import { HandleController } from "../../../lib/handle.class";
import { Controller } from "../../../lib/handle.controller";
import { Curd } from "../../../lib/handle.curd";
import { Inject } from "../../../lib/handle.inject";
import { Get, Post } from "../../../lib/handle.method";
import { Pipe } from "../../../lib/handle.pipe";
import { Ret, user } from "./App917.enity";
import { useIdPipe, userNamePipe } from "./App917.pipe";
import { App917Service } from "./App917.service";
import { UseCache } from "../../../lib/handle.cache";
import { RedisClientType } from "redis";
import { Body } from "../../../lib/types";
import { commonClass } from "../../config/common";

@Controller("/app917")
class App917Controller extends HandleController {
  @Inject(App917Service)
  App917Service!: App917Service;
  @UseCache("redis", commonClass)
  Redis!: RedisClientType;
  @Get("/a1")
  public async a1() {
    const ret = await this.App917Service.a1();
    console.log("ret", ret);

    return {
      Msg: "测试中",
      Code: 0,
      ret,
    };
  }
  @Get("/b1")
  @Pipe([useIdPipe, userNamePipe])
  public async b1(_req: any, _res: any) {
    const ret = await this.App917Service.a1();
    return {
      Msg: "测试中",
      Code: 0,
      ret,
    };
  }
  @Get("/c1")
  @Pipe(useIdPipe)
  public async c1(_req: any, _res: any) {
    const data = await this.App917Service.a1();
    return Ret.Message(0, "ok", data);
  }
  @Curd(
    "/user",
    user,
    {
      name: "mysql",
      obj: commonClass,
    },
    {
      name: "redis",
      obj: commonClass,
    }
  )
  public async CurdUser() {}
  @Post("/seckill")
  public async SecKill(
    req: Body<{ uId: string; proId: string }>,
    _res: Response
  ) {
    if (!this.Redis.isOpen) {
      await this.Redis.connect();
    }
    const body = req.body;
    const getRest = await this.App917Service.getRestKey(this.Redis, body.proId);
    const getUserKey = `sk:${req.body.uId}:user`;
    if (getRest.total === null) {
      return {
        msg: "还没开始",
      };
    }
    const hasMember = await this.Redis.sIsMember(getUserKey, body.uId);
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
      await this.Redis.decr(getRest.key);
      await this.Redis.sAdd(getUserKey, body.uId);
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
    if (!this.Redis.isOpen) {
      await this.Redis.connect();
    }
    const key = `sk:${req.body.proId}:qt`;
    await this.Redis.set(key, req.body.total);
    return {
      msg: "设置成功",
    };
  }

  @Get("/testr")
  public async testRedis() {
    // @ts-ignore
    // const redisInst = await this.Redis();
    // console.log("this.Redis", this.Redis);
    // console.log("redisInst", redisInst);
    console.log(this.Redis);

    return {
      data: "ok",
    };
  }
}

export { App917Controller };
