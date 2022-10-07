import { CreateCache, CreateDb } from "ado-node";
import * as mysql from "mysql";
import { createClient } from "redis";
import { CONSTANT } from "./constant";
export class CommonClass {
  @CreateDb(CONSTANT.MYSQL)
  public async CreateDB() {
    const config = {
      host: "localhost",
      user: "root",
      password: "12345678",
      database: "boot", //所用数据库
      port: "3306",
    };
    const conn = await mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database,
      multipleStatements: true,
    });
    return conn;
  }
  @CreateCache(CONSTANT.REDIS)
  public async CreateCache() {
    return createClient();
  }
}
