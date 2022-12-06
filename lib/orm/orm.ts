import * as mysql from "mysql";
// import { AdoBaseConfig } from "../config";
import { ref } from "../core";
import { ClientError } from "../error/client";
import { DataBaseError } from "../error/dababase";
import { getStrCount } from "../oper/protect";

export const RunConfig = Symbol("RUNCONFIG");
export const BASEENITY = Symbol("BASEENITY");
export const Conn = Symbol("CONN");
export const Target = Symbol("TARGET");
export const GetConn = Symbol("GETCONN");
export const TableName = Symbol("TableName");

class AdoOrmBaseEnity {
  public [BASEENITY]!: Function;
  public [Conn]!: mysql.PoolConnection;
  public [Target]: any;
  public [TableName]!: string;
  constructor() {
    this[Target] = AdoOrmBaseEnity.name;
  }
  public async [RunConfig](BaseEnity: Function, dbname: string) {
    this[BASEENITY] = BaseEnity;
    this[TableName] = dbname;
    this[GetConn]();
  }
  public async [GetConn]() {
    const Connection = ref.get(":pool", this[BASEENITY].prototype);
    this[Conn] = await Connection();
  }
  /**
   * @method getList
   * @description 获取所有的数据
   */
  public async getList(page: string, size: string) {
    return new Promise((resolve, reject) => {
      this[Conn].query(
        `select * from ?? limit ?,?`,
        [this[TableName], parseInt(page), parseInt(size)],
        function (err, res) {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  /**
   * @method getOneBy
   * @description 单独根据Key 来获取数据
   */
  public async getOneBy(val: any) {
    const key = ref.get("key", this[BASEENITY].prototype);
    const count = getStrCount(val, ["delete", "drop"]);
    if (count) {
      const Error = new ClientError("非法参数，可能为恶意sql注入");
      return Error;
    }
    return new Promise((resolve) => {
      this[Conn].query(
        `select * from ?? where ?? = ?`,
        [this[TableName], key, val],
        function (err, res) {
          if (err) {
            const Error = new DataBaseError(
              "数据库错误,也许配置项是非法的",
              err
            );
            resolve(Error);
          }
          resolve(res);
          // this[Conn]
        }
      );
    });
  }
  /**
   * @method delOneBy
   * @description 单独根据Key 值来删除
   */
  public async delOneBy(val: any) {
    const key = ref.get("key", this[BASEENITY].prototype);
    return new Promise((resolve, reject) => {
      this[Conn].query(
        `DELETE FROM ?? WHERE ?? = ?`,
        [this[TableName], key, val],
        function (err, res) {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  /**
   * @method countBy // 根据key - value 得到数据库中的数量
   * @param val
   */
  public async countBy(val: Record<string, string>) {
    let countSql = `select count(*) as total from ?? where `;
    const jonitSql = this[Conn].escape(val).replaceAll(",", " and ");
    return new Promise((resolve, reject) => {
      this[Conn].query(
        countSql + jonitSql,
        [this[TableName]],
        function (err, res) {
          if (err) {
            reject(err);
          }
          const data = res[0];
          resolve(data);
        }
      );
    });
  }
  /**
   * @method getBy
   * @param {} Record<string, string>
   */
  public async getBy(val: Record<string, string>) {
    const sql = this[Conn].escape(val).replaceAll(",", " and ");
    return new Promise((resolve, reject) => {
      this[Conn].query(
        "select * from ?? where " + sql,
        [this[TableName]],
        function (err, res) {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  /**
   * @method save
   * @paramsType <T extends Record<string, string>
   */
  public async save<T extends Record<string, string> | Object>(val: T) {
    const filterUndefined = JSON.parse(JSON.stringify(val));
    return new Promise((resolve, reject) => {
      this[Conn].query(`insert into ??  SET ? `, [this[TableName], filterUndefined], function (err, res) {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  public async getMany(sql: string, options?: any[]) {
    return new Promise((resolve, reject) => {
      this[Conn].query(sql, options, function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  public async query(sql: string, options?: string[]) {
    return new Promise((resolve, reject) => {
      this[Conn].query(sql, options, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }
}
export { AdoOrmBaseEnity };
