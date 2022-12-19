/**
 * @author chelizichen
 * @description 提供事物操作
 */
import { Conn } from "./symbol";
import { AdoOrmBaseEntity } from "./orm";
import * as mysql from 'mysql'


export class transaction {
  __that__!: AdoOrmBaseEntity;

  conn!: mysql.PoolConnection;

  __manager__: (() => Promise<any>)[];

  constructor() {
    this.__manager__ = [];
  }

  async connection() {
    this.conn = await this.__that__[Conn];
  }

  async start(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.conn.beginTransaction((err) => {
        if (err) {
          reject(err);
        }
        Promise.all(this.__manager__.map(async (el) => await el()))
          .then((res) => {
            console.log("res", res);

            this.conn.commit((err) => {
              if (err) {
                console.log("事物提交失败");
                reject(err);
              }
            });
            resolve(res);
          })
          .catch((err) => {
            console.log("err", err);
            this.conn.rollback(() => {
              console.log("数据操作回滚");
            });
            reject(err);
          });
      });
    });
  }

  async TransactionError(msg:string) {
    return Promise.reject(msg)
  }

  push(fn: () => Promise<any>): void {
    this.__manager__.push(fn);
  }
}
