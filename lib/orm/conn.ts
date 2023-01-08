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
  static connectionPools: Array<{ pool: mysql.Pool; name: string }> = [];
  static defaultConnName: string;

  static async readConfig() {
    if (!Connection.connectionPool) {
      const config = process.cwd() + "/ado.config.js";
      try {
        const data = require(config);
        await Connection.createConnection(data);
      } catch (e) {
        throw e;
      }
    }
  }

  static async createConnection(configInfo: any) {
    let database;
    if (configInfo) {
      // ESM 下 export default
      if (configInfo && configInfo.default) {
        database = configInfo.default.database;
      }
      // CommonJS 下 module.export
      else {
        database = configInfo.database;
      }
    }

    // 为不同的数据库分配连接池
    if (database instanceof Array) {
      database.forEach(async (item: any) => {
        const name = item.database;
        const pool = await mysql.createPool({
          host: item.host,
          user: item.username,
          password: item.password,
          database: item.database,
          port: item.port,
          connectionLimit: item.connectionLimit,
        });
        // 设置默认连接池
        if (item.default) {
          Connection.connectionPool = pool;
          Connection.defaultConnName = item.database;
        }
        Connection.connectionPools.push({ pool, name });
      });
    } else {
      const pool = await mysql.createPool({
        host: database.host,
        user: database.username,
        password: database.password,
        database: database.database,
        port: database.port,
        connectionLimit: database.connectionLimit,
      });
      Connection.connectionPool = pool;
    }
  }

  static async PromiseQuery(
    conn: mysql.Connection,
    sql: string,
    options: number | string[]
  ): Promise<any>;
  static async PromiseQuery(
    conn: mysql.Connection,
    sql: string,
  ): Promise<any>;
  static async PromiseQuery(
    conn: mysql.Connection,
    sql: string,
    options?: number | string[]
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      conn.query(sql, options, function (err, resu) {
        if (err) {
          reject(err);
        }
        resolve(resu);
      });
    });
  }
  static async getConnection(name: string): Promise<mysql.PoolConnection>;
  static async getConnection(): Promise<mysql.PoolConnection>;
  static async getConnection(name?: string): Promise<mysql.PoolConnection> {
    if (!Connection.connectionPool) {
      await Connection.readConfig();
    }

    if (!name || name == Connection.defaultConnName) {
      return new Promise((resolve, reject) => {
        Connection.connectionPool?.getConnection((err, connection) => {
          if (err) {
            reject(err);
          }
          resolve(connection);
        });
      });
    } else {
      let getPoolByName = Connection.connectionPools.find(
        (el) => el.name == name
      );
      if (getPoolByName) {
        return new Promise((resolve, reject) => {
          getPoolByName?.pool.getConnection((err, connection) => {
            if (err) {
              reject(err);
            }
            resolve(connection);
          });
        });
      }
    }

    throw new Error(`没有从mysql中找到该数据库${name}`);
  }
}

function getConnection(database?: string) {
  if (database) {
    return Connection.getConnection(database);
  } else {
    return Connection.getConnection()
  }
}

async function PromiseQuery(
  conn: mysql.Connection,
  sql: string,
  options?: number | string[]
) {
  if (options) {
    return await Connection.PromiseQuery(conn, sql, options);
  } else {
    return await Connection.PromiseQuery(conn, sql);

  }
}

async function gerRedis() {
  return await createClient();
}

export {
  getConnection,
  Connection,
  gerRedis,
  defineAdoNodeConfig,
  PromiseQuery,
};
