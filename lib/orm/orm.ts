import * as mysql from "mysql";
import { ClassConstructor, CONSTANT, ref } from "../core";
import { OberServer } from "../ober/oberserver";
export class AdoOrmBaseEnity {
  public BaseEnity!: Function;
  public conn!: mysql.Connection;
  constructor(BaseEnity: ClassConstructor, dbname: string) {
    this.BaseEnity = BaseEnity;
    this.getConn(dbname);
  }
  private async getConn(dbname: string) {
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
    const options = [val];
    return new Promise((resolve, reject) => {
      this.conn.query(
        `select * from ${this.BaseEnity.name} where ${key} = ?`,
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
   * @method delOneBy
   * @description 单独根据Key 值来删除
   */
  public async delOneBy(val: any) {
    const key = ref.get("key", this.BaseEnity.prototype);
    const options = [val];
    return new Promise((resolve, reject) => {
      this.conn.query(
        `DELETE FROM ${this.BaseEnity.name} WHERE ${key} = ?`,
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
    const tablename = this.BaseEnity.name;
    let countSql = `select count(*) as total from ${tablename} where `;
    let jointSql = "";
    let keys = Object.keys(val);
    keys.forEach((item, index) => {
      if (index != keys.length - 1) {
        jointSql += `${item} = '${val[item]}' and `;
      } else {
        jointSql += `${item} = '${val[item]}' `;
      }
    });
    countSql += jointSql;
    return new Promise((resolve, reject) => {
      this.conn.query(countSql, function (err, res) {
        if (err) {
          reject(err);
        }
        const data = res[0];
        resolve(data);
      });
    });
  }
  public async getBy(val: Record<string, string>) {
    const tablename = this.BaseEnity.name;
    let countSql = `select * as total from ${tablename} where `;
    let jointSql = "";
    let keys = Object.keys(val);
    keys.forEach((item, index) => {
      if (index != keys.length - 1) {
        jointSql += `${item} = '${val[item]}' and `;
      } else {
        jointSql += `${item} = '${val[item]}' `;
      }
    });
    countSql += jointSql;
    return new Promise((resolve, reject) => {
      this.conn.query(countSql, function (err, res) {
        if (err) {
          reject(err);
        }
        const data = res[0];
        resolve(data);
      });
    });
  }
  public async save(val: Record<string, string>) {
    let opt = [this.BaseEnity.name, val];
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
