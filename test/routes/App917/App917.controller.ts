import { HandleController } from "../../../lib/handle.class";
import { Controller } from "../../../lib/handle.controller";
import { Curd } from "../../../lib/handle.curd";
import { Inject } from "../../../lib/handle.inject";
import { Get, Post } from "../../../lib/handle.method";
import { Pipe } from "../../../lib/handle.pipe";
import { Ret, user } from "./App917.enity";
import { useIdPipe, userNamePipe } from "./App917.pipe";
import { App917Service } from "./App917.service";
import * as mysql from "mysql";
import { UseCache } from "../../../lib/handle.cache";
import { createClient, RedisClientType } from "redis";
import { Body } from "../../../lib/types";

const config = {
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "boot", //所用数据库
  port: "3306",
};
export const coon = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  multipleStatements: true,
});

@Controller("/app917")
class App917Controller extends HandleController {
  @Inject(App917Service)
  App917Service!: App917Service;

  @UseCache(createClient())
  Redis!: RedisClientType;

  @Get("/a1")
  public async a1() {
    const ret = await this.App917Service.a1();
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

  @Curd("/user", user, coon)
  public async CurdUser() {}

  @Post("/seckill")
  public async SecKill(
    req: Body<{ uId: string; proId: string }>,
    _res: Response
  ) {
    const body = req.body;
    // console.log(this.Redis);
    // 1 获取库存
    const getRest = await this.App917Service.getRestKey(this.Redis, body.proId);
    // 2 获取用户
    const getUserKey = await this.App917Service.getUserKey(
      this.Redis,
      body.uId
    );
    if (getRest.total === null) {
      return {
        msg: "还没开始",
      };
    }
    // 4 判断用户是否重复操作
    const hasMember = await this.Redis.sIsMember(getUserKey, body.uId);
    if (hasMember) {
      return {
        msg: "您已秒杀成功，不能重复操作",
      };
    }
    // 5 如果库存数量少于1 则停止操作
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
    // 6 确认操作 并且付款到账以后 并入数据库里面生成数据

    return Ret.Message(0, "success", "data");
  }
  @Post("/addProd")
  public async addProd(
    req: Body<{ proId: string; total: string }>,
    _res: Response
  ) {
    const key = `sk:${req.body.proId}:qt`;
    await this.Redis.set(key, req.body.total);
    return {
      msg: "设置成功",
    };
  }
}

export { App917Controller };
