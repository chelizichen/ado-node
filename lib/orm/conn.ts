/**
 * @author chelizichen
 * @date 2022.12.19
 * @description ORM  根据配置文件进行数据库连接管理
 */

import * as mysql from "mysql";
import { createClient } from "redis";

type AdoNodeConfig = {
  database: {
    type: string;
    host: string;
    username: string;
    password: string;
    database: string;
    port: number;
    connectionLimit?: number;
  };
};

function defineAdoNodeConfig(config: AdoNodeConfig) {
  return config;
}

class Connection {
  static connectionPool: mysql.Pool;

  static async readConfig() {
    const config1 = process.cwd() + "/test/ado.config.ts";
    const config2 = process.cwd() + "/ado.config.ts";
    const data = await import(config1 ? config1 : config2);
    await Connection.createConnection(data);
  }

  static async createConnection(configInfo: any) {
    const config = configInfo.default.database;
    Connection.connectionPool = await mysql.createPool({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database,
      port: config.port,
      connectionLimit: config.connectionLimit,
    });
  }

  static async getConnection(): Promise<mysql.PoolConnection> {
    if (!Connection.connectionPool) {
      await Connection.readConfig();
    }
    return new Promise((resolve, reject) => {
      Connection.connectionPool?.getConnection((err, connection) => {
        if (err) {
          reject(err);
        }
        resolve(connection);
      });
    });
  }
}

function getConnection() {
  return Connection.connectionPool;
}

async function gerRedis() {
  return await createClient();
}

export { getConnection, Connection, gerRedis, defineAdoNodeConfig };
