import * as mysql from "mysql";
import { CONSTANT, ref } from "../core";
import { OberServer } from "../ober/oberserver";
export class AdoNodeOrm {
  public BaseEnity!: any;
  public conn!: mysql.Connection;
  constructor(BaseEnity: any, dbname: string) {
    this.BaseEnity = BaseEnity;
    this.getConn(dbname);
  }
  private getConn(dbname: string) {
    let OberInst = ref.get(
      CONSTANT.Observer,
      OberServer.prototype
    ) as OberServer;
    const CommonClass = OberInst.get(CONSTANT.Config)?.value;
    const CacheInst = ref.get(dbname, CommonClass.prototype);
    this.conn = CacheInst;
  }
  /**
   * @method getList
   * @description 获取所有的数据
   */
  public async getList() {
    const conn = await this.conn;
    return new Promise((resolve, reject) => {
      conn.query(
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

  public async getOneBy() {}

  /**
   * @method delOneByKey
   * @description 单独根据Key 值来删除
   */
  public async delOneByKey() {}
}
