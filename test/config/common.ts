import { createClient } from "redis";
import * as mysql from "mysql";

class commonClass {
  static pool: mysql.Pool
  
  static async getRedis() {
    return await createClient();
  }
}

export { commonClass };
