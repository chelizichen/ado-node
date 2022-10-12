import { createClient } from "redis";
import { CreateCache } from "../../lib/store/cache";
import { CreateDb } from "../../lib/store/db";
import * as mysql from "mysql";
import { Config } from "../../lib/store/config";
@Config
class commonClass {
  @CreateCache("redis")
  public async getRedis() {
    return await createClient();
  }
  @CreateDb("mysql")
  public async getConn() {
    console.log("注入数据库连接");
    const config = {
      host: "localhost",
      user: "root",
      password: "12345678",
      database: "boot", //所用数据库
      port: 3306,
    };
    const coon = await mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database,
      port: config.port,
      multipleStatements: true,
    });
    return coon;
  }
}
export { commonClass };
