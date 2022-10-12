import * as mysql from "mysql";
import { CONSTANT, ref } from "../core";
import { ClientError } from "../error/client";
import { DataBaseError } from "../error/dababase";
import { OberServer } from "../ober/oberserver";
import { getStrCount } from "../oper/protect";
export class AdoOrmBaseEnity {
  public BaseEnity!: Function;
  public conn!: mysql.Connection;
  public async getConn(dbname: string) {
    let OberInst = ref.get(
      CONSTANT.Observer,
      OberServer.prototype
    ) as OberServer;
    const CommonClass = OberInst.get(CONSTANT.Config)?.value;
    const CacheInst = ref.get(dbname, CommonClass.prototype);
    this.conn = await CacheInst;
  }
  /**
   * @method getList
   * @description 获取所有的数据
   */
  public async getList() {
    return new Promise((resolve, reject) => {
      this.conn.query(
        `select * from ${this.BaseEnity.name} limit 0,10`,
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
    const key = ref.get("key", this.BaseEnity.prototype);
    const count = getStrCount(val, ["delete", "drop"]);
    if (count) {
      const Error = new ClientError("非法参数，可能为恶意sql注入");
      return Error;
    }
    const options = [this.BaseEnity.name, key, val];

    return new Promise((resolve) => {
      this.conn.query(
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
    const key = ref.get("key", this.BaseEnity.prototype);
    const options = [this.BaseEnity.name, key, val];
    return new Promise((resolve, reject) => {
      this.conn.query(
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
    const jonitSql = this.conn.escape(val).replaceAll(",", " and ");
    return new Promise((resolve, reject) => {
      this.conn.query(
        countSql + jonitSql,
        [this.BaseEnity.name],
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
    const sql = this.conn.escape(val).replaceAll(",", " and ");
    return new Promise((resolve, reject) => {
      this.conn.query(
        "select * from ?? where " + sql,
        [this.BaseEnity.name],
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
    let opt = [this.BaseEnity.name, filterUndefined];
    return new Promise((resolve, reject) => {
      this.conn.query(`insert into ??  SET ? `, opt, function (err, res) {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
}
