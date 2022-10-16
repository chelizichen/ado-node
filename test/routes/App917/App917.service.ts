import { RedisClientType } from "@redis/client";
import { query, UseDataBase } from "../../../lib/core";
import { Collect, Inject } from "../../../lib/ioc/ioc";
import { User } from "./App917.enity";
import * as mysql from "mysql";
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
}

export { App917Service };
