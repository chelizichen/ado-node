import { HandleController } from "../../../lib/ioc/class";
import { Controller } from "../../../lib/ioc/controller";
import { Curd } from "../../../lib/oper/curd";
import { Inject } from "../../../lib/ioc/ioc";
import { Get, Post } from "../../../lib/method/method";
import { Ret, User } from "./App917.enity";
import { App917Service } from "./App917.service";
import { UseCache } from "../../../lib/store/cache";
import { RedisClientType } from "redis";
import { Body } from "../../../lib/types";
import { UserNamePipe } from "./App917.pipe";
import { del, query, update } from "../../../lib/orm/sql";
import { Request } from "express";
import { UsePipe } from "../../../lib/pipe/pipe";
@Controller("/app917")
class App917Controller extends HandleController {
  @Inject(App917Service)
  App917Service!: App917Service;
  @UseCache("redis")
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
  @UsePipe(new UserNamePipe())
  public async b1(_req: Request, _res: any) {
    // console.log(_req.);

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
      .setEnity(User)
      .and("username", "leemulus")
      .and("age", "13")
      .pagination(1, 10)
      .getSql();

    console.log(sql);
    const sql1 = new query()
      .setEnity(User)
      .and({
        username: "leemulus",
        phone: "13476973442",
      })
      .pagination(0, 10)
      .getSql();

    console.log(sql1);
    const sql2 = new query()
      .setEnity(User)
      .setColumn(["phone", "username", "age"])
      .getSql();
    console.log(sql2);

    const sql3 = new query()
      .setEnity(User)
      .setColumn(["phone", "username", "age"])
      .pagination(0, 10)
      .getSql();
    console.log(sql3);

    const sql4 = new query()
      .setEnity(User)
      .setColumn(["phone", "username", "age"])
      .and("key", "value")
      .like("key1", "value1", "and")
      .pagination(0, 10)
      .getSql();
    console.log(sql4);

    const sql5 = new query()
      .setEnity(User)
      .setColumn(["phone", "username", "age"])
      .like("key3", "value3", "and")
      .or("key", "value")
      .or("key2", "value2")
      .pagination(0, 10)
      .getSql();
    console.log(sql5);

    const up1 = new update()
      .setEnity("goods")
      .setOptions({
        g_name: "1asd",
        b: "2asd",
        c: "3asd",
      })
      .and("id", "2")
      .and("b1", "b2")
      .getSql();
    console.log(up1);

    const up2 = new update()
      .setEnity("set")
      .setOptions({
        a: "1asd",
        b: "2asd",
        c: "3asd",
      })
      .or({ a1: "1", b1: "2" })
      .getSql();
    console.log(up2);

    return Ret.Message(0, "ok", data);
  }

  @Get("/d1")
  public async d1(_req: any, _res: any) {
    const data = await this.App917Service.a1();
    const sql = new del()
      .setEnity(User)
      .and("username", "leemlus")
      .and("phone", "13476973442")
      .getSql();
    console.log("sql", sql);

    const sql1 = new del().setEnity(User).getSql();
    console.log("sql1", sql1);

    const sql2 = new del()
      .setEnity(User)
      .and({
        username: "leemulus",
        phone: "13476973442",
      })
      .getSql();
    console.log("sql2", sql2);

    const sql3 = new del()
      .setEnity(User)
      .or({
        username: "leemulus",
        phone: "13476973442",
      })
      .getSql();
    console.log("sql3", sql3);

    // new user()
    return Ret.Message(0, "ok", data);
  }

  @Get("/f1")
  public async f1() {
    const data = await this.App917Service.f1();
    return data;
  }
  @Curd("/user", User, ["mysql", "redis"])
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
