import { createClient } from "redis";
import { CreateCache } from "../../lib/store/cache";
import { CreateDataBase } from "../../lib/store/db";
import * as mysql from "mysql";
import { Config } from "../../lib/store/config";
@Config
class commonClass {
  @CreateCache("redis")
  public async getRedis() {
    return await createClient();
  }
  @CreateDataBase("mysql")
  public async getConn() {
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

  @CreateDataBase("mysqlPool")
  public async getMysqlPool() {
    const config = {
      host: "localhost",
      user: "root",
      password: "12345678",
      database: "boot", //所用数据库
      port: 3306,
    };
    const coon = await mysql.createPool({
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database,
      port: config.port,
    });
    return coon;
  }
}

export { commonClass };
