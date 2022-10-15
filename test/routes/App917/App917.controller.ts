import { HandleController } from "../../../lib/ioc/class";
import { Controller } from "../../../lib/ioc/controller";
import { Curd } from "../../../lib/oper/curd";
import { Inject } from "../../../lib/ioc/ioc";
import { Get, Post } from "../../../lib/method/method";
import { UsePipe } from "../../../lib/pipe/pipe";
import { Ret, user } from "./App917.enity";
import { App917Service } from "./App917.service";
import { UseCache } from "../../../lib/store/cache";
import { RedisClientType } from "redis";
import { Body } from "../../../lib/types";
import { UserNamePipe } from "./App917.pipe";
import { query } from "../../../lib/orm/sql";

@Controller("/app917")
class App917Controller extends HandleController {
  @Inject(App917Service)
  App917Service!: App917Service;
  @UseCache("redis")
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
  @UsePipe(new UserNamePipe())
  public async b1(_req: any, _res: any) {
    const ret = await this.App917Service.a1();
    return {
      Msg: "测试中",
      Code: 0,
      ret,
    };
  }
  @Get("/c1")
  public async c1(_req: any, _res: any) {
    const data = await this.App917Service.a1();

    const sql = new query()
      .setEnity(user)
      .and("username", "leemulus")
      .and("age", "13")
      .pagination(1, 10)
      .getMany();

    console.log(!sql);
    const sql1 = new query()
      .setEnity(user)
      .and({
        username: "leemulus",
        phone: "13476973442",
      })
      .pagination(0, 10)
      .getMany();

    console.log(sql1);
    const sql2 = new query()
      .setEnity(user)
      .setColumn(["phone", "username", "age"])
      .getMany();
    console.log(!sql2);

    const sql3 = new query()
      .setEnity(user)
      .setColumn(["phone", "username", "age"])
      .pagination(0, 10)
      .getMany();
    console.log(!sql3);

    return Ret.Message(0, "ok", data);
  }
  @Curd("/user", user, ["mysql", "redis"])
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
    console.log(getRest.total);

    if (getRest.total == null) {
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
    console.log(this.Redis);

    return {
      data: "ok",
    };
  }
}

export { App917Controller };
