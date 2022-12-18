import { createClient } from "redis";
import * as mysql from "mysql";

const config = {
    host: "localhost",
    user: "root",
    password: "123456",
    database: "zrq_shop", //所用数据库
    port: 3306,
  };

class commonClass {
  static pool: mysql.Pool
  
  static async getRedis() {
    return await createClient();
  }

  static async createPool() {
    commonClass.pool = await mysql.createPool({
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database,
      port: config.port,
      connectionLimit: 10,
    });
  }

  static async getMysqlPoolConnection():Promise<mysql.PoolConnection>{
    return new Promise(async (resolve, reject) => {
      if (commonClass.pool == null) {
        await commonClass.createPool();
      }
      commonClass.pool.getConnection(async (err, connetion) => {
        if (err) {
          reject(err);
        }
        resolve(connetion);
      });
    })
  }
}

export { commonClass };
