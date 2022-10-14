import * as mysql from "mysql";
import { CONSTANT, ref } from "../core";
import { ClientError } from "../error/client";
import { DataBaseError } from "../error/dababase";
import { OberServer } from "../ober/oberserver";
import { getStrCount } from "../oper/protect";

export const RunConfig = Symbol("RUNCONFIG");
export const BASEENITY = Symbol("BASEENITY");
export const Conn = Symbol("CONN");
export const Target = Symbol("TARGET");
export const GetConn = Symbol("GETCONN");
export class AdoOrmBaseEnity {
  public [BASEENITY]!: Function;
  public [Conn]!: mysql.Connection;
  public [Target]: any;
  constructor() {
    this[Target] = AdoOrmBaseEnity.name;
  }
  public async [RunConfig](BaseEnity: Function, dbname: string) {
    if (this[Target] !== "AdoOrmBaseEnity") {
      console.log("this.target.name", this[Target]);
      console.log("不是AdoOrmBaseEnity 函数调用 拒绝访问");
      return false;
    }
    this[GetConn](dbname);
    this[BASEENITY] = BaseEnity;
    return true;
  }
  public async [GetConn](dbname: string) {
    if (this[Target] !== "AdoOrmBaseEnity") {
      console.log("this.target.name", this[Target]);
      console.log("不是AdoOrmBaseEnity 函数调用 拒绝访问");
      return false;
    }
    let OberInst = ref.get(
      CONSTANT.Observer,
      OberServer.prototype
    ) as OberServer;
    const CommonClass = OberInst.get(CONSTANT.Config)?.value;
    const CacheInst = ref.get(dbname, CommonClass.prototype);
    this[Conn] = await CacheInst;
    return;
  }
  /**
   * @method getList
   * @description 获取所有的数据
   */
  public async getList() {
    return new Promise((resolve, reject) => {
      this[Conn].query(
        `select * from ${this[BASEENITY].name} limit 0,10`,
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
    const options = [this[BASEENITY].name, key, val];

    return new Promise((resolve) => {
      this[Conn].query(
        `select * from ?? where ?? = ?`,
        options,
        function (err, res) {
          if (err) {
            const Error = new DataBaseError(
              "数据库错误,也许配置项是非法的",
              err
            );
            resolve(Error);
          }
          resolve(res);
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
    const options = [this[BASEENITY].name, key, val];
    return new Promise((resolve, reject) => {
      this[Conn].query(
        `DELETE FROM ?? WHERE ?? = ?`,
        options,
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
        [this[BASEENITY].name],
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
        [this[BASEENITY].name],
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
    let opt = [this[BASEENITY].name, filterUndefined];
    return new Promise((resolve, reject) => {
      this[Conn].query(`insert into ??  SET ? `, opt, function (err, res) {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
}
