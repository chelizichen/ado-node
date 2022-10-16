import { RedisClientType } from "@redis/client";
import { query, UseDataBase } from "../../../lib/core";
import { Collect, Inject } from "../../../lib/ioc/ioc";
import { User } from "./App917.enity";
import * as mysql from "mysql";
import { save, update } from "../../../lib/orm/sql";
@Collect()
class App917Service {
  @Inject(User)
  User!: User;

  @UseDataBase("mysql")
  conn!: mysql.Connection;
  public async a1() {
    const sql = new query()
      .setEnity(User)
      .and({
        username: "leemulus",
        phone: "13476973442",
      })
      .getSql();
    // console.log(this.User);
    const data = await this.User.getMany(sql);
    return data;
  }
  public async getRestKey(
    redis: RedisClientType<any, any, any>,
    ProdId: string
  ) {
    const key = `sk:${ProdId}:qt`;
    let data = await redis.get(key);
    if (!data) {
      data = null;
    }
    return {
      total: Number(data),
      key,
    };
  }
  public getUserKey(UID: string) {
    const key = `sk:${UID}:user`;
    return key;
  }
  async f1() {
    const sql = new update()
      .setEnity("hotkeyword")
      .setOptions({ thekeys: "疫情新闻" })
      .and("thekeys", "疫情")
      .getSql();

    console.log(sql);

    // const data = await this.User.getMany(sql.sql, sql.opt);
    const sql1 = new save()
      .setEnity("goods")
      .setOptions("g_price", "666")
      .setOptions("g_type", "222")
      .setOptions("g_name", "商品安利")
      .getSql();
    console.log(sql1);

    const data = await this.User.getMany(sql1.sql, sql1.opt);

    return data;
  }
}

export { App917Service };
