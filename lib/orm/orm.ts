import * as mysql from "mysql";
import { ref } from "../ioc";
import { ClientError } from "../error/client";
import { DataBaseError } from "../error/dababase";
import { getStrCount } from "../oper/protect";
import { RedisClientType, createClient } from "redis";
import {  isObject } from "lodash";
import * as __ from "lodash";
import { query, update, del, save } from "./sql";
import { transaction } from "./transaction";
import { Connection } from "./conn";
import {
  BASEENITY,
  Target,
  TableName,
  RedisClient,
  BF__DELETE,
  BF__INSERT,
  BF__UPDATE,
  VoidFunction,
  querybuilder,
  GetCache,
  cacheOptions,
  Cache,
  Conn,
  RunConfig
} from "./symbol";

function void_fn() { }

class AdoOrmBaseEntity {
  public [BASEENITY]!: Function;
  public [Conn]!: mysql.PoolConnection;
  public [Target]: any;
  public [TableName]!: string;
  public [RedisClient]: RedisClientType;
  public [BF__DELETE]!: Function;
  public [BF__INSERT]!: Function;
  public [BF__UPDATE]!: Function;

  public [VoidFunction]() { }

  constructor() {
    this[Target] = AdoOrmBaseEntity.name;
    this[RedisClient] = createClient();
    this[RedisClient].connect();
  }


  public createTransaction() {
    const TranSactionInstance = new transaction();
    TranSactionInstance.__that__ = this;
    return TranSactionInstance;
  }

  public createQueryBuilder(): querybuilder {
    return {
      query: new query(),
      save: new save(),
      update: new update(),
      del: new del(),
    };
  }

  public cache(cacheOptions:cacheOptions,VAL:any) {
    return this[Cache](cacheOptions,VAL)
  }

  public async [GetCache](cacheOptions: cacheOptions) {
    const isCache = (isObject(cacheOptions) && cacheOptions.cache);
    if (isCache) {
      let cacheVal = await this[RedisClient].get(cacheOptions.key);
      if (cacheVal) {
        return cacheVal;
      }
    }
    return
  }


  public async [RunConfig](BaseEnity: Function, dbname: string) {
    try {
      this[Conn] = await Connection.getConnection();
    } catch (e) {
      throw e
    }
    this[BASEENITY] = BaseEnity;
    this[TableName] = dbname;


    const bf_destory = ref.get(
      "monitor",
      this[BASEENITY].prototype,
      ":before-delete"
    );

    this[BF__DELETE] = bf_destory != undefined ? bf_destory : void_fn;

    const bf_insert = ref.get(
      "monitor",
      this[BASEENITY].prototype,
      ":before-insert"
    );

    this[BF__INSERT] = bf_insert != undefined ? bf_insert : void_fn;

    const bf_update = ref.get(
      "monitor",
      this[BASEENITY].prototype,
      ":before-update"
    );
    this[BF__UPDATE] = bf_update != undefined ? bf_update : void_fn;

    
  }


  public async [Cache](
    cacheOptions: cacheOptions, value: any
  ): Promise<void> {
    const { key, timeout, cache } = cacheOptions
    let tocacheVal = "" as string;
    if(typeof value == "string"){
      tocacheVal = value
    }

    if(typeof value == "number"){
      tocacheVal = String(value)
    }

    if(isObject(value)){
      tocacheVal = JSON.stringify(value)
    }

    if(cache){
      this[RedisClient].set(key, tocacheVal)
      if (timeout) {
        this[RedisClient].expire(key, timeout)
      }
    }
  }

  /**
   * @method getList
   * @description 获取所有的数据
   */
  public async getList(page: string, size: string) {
    return new Promise((resolve, reject) => {
      this[Conn].query(
        " select * from ?? limit ?,? ",
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

  public async getOneBy(val: string): Promise<any>;

  public async getOneBy(val: string, cache: cacheOptions): Promise<any>;

  public async getOneBy(
    val: string,
    cache?: cacheOptions
  ): Promise<any> {
    {

      if (cache) {
        const data = await this[GetCache](cache)
        if (data) {
          return data;
        }
      }

      const key = ref.get("key", this[BASEENITY].prototype);
      const count = getStrCount(val, ["delete", "drop"]);

      if (count) {
        return new ClientError("非法参数,可能为恶意sql注入");
      }

      return new Promise((resolve) => {
        let that = this;
        console.log("this[Conn]", this[Conn]);
        
        this[Conn].query(
          `select * from ?? where ?? = ?`,
          [this[TableName], key, val],
          function (err, res) {
            if (err) {
              resolve(new DataBaseError("数据库错误,也许配置项是非法的", err));
            }
            resolve(res);

            if (cache) {
              that[Cache](cache, res)
            }
          }
        );
      });
    }
  }
  /**
   * @method delOneBy
   * @description 单独根据Key 值来删除
   */
  public async delOneBy(val: string) {
    // 中断操作
    const isbreak = await this[BF__DELETE](val);
    if (isbreak) {
      return isbreak;
    }

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
  public async countBy(val: Record<string, string>): Promise<any>;

  public async countBy(
    val: Record<string, string>,
    cache: cacheOptions
  ): Promise<any>;

  public async countBy(
    val: Record<string, string>,
    cache?: cacheOptions
  ) {

    if (cache) {
      const data = await this[GetCache](cache)
      if (data) {
        return data;
      }
    }

    let countSql = `select count(*) as total from ?? where `;
    const jonitSql = this[Conn].escape(val).replaceAll(",", " and ");
    return new Promise((resolve, reject) => {
      let that = this;
      this[Conn].query(
        countSql + jonitSql,
        [this[TableName]],
        function (err, res) {
          if (err) {
            reject(err);
          }
          const data = res[0];
          resolve(data);

          if (cache) {
            that[Cache](cache, res)
          }

        }
      );
    });
  }
  /**
   * @method getBy
   * @param {} Record<string, string>
   */
  public async getBy(val: Record<string, string>): Promise<any>;
  public async getBy(
    val: Record<string, string>,
    cache: cacheOptions
  ): Promise<any>;
  public async getBy(
    val: Record<string, string>,
    cache?: cacheOptions
  ) {
    if (cache) {
      const data = await this[GetCache](cache)
      if (data) {
        return data;
      }
    }

    const sql = this[Conn].escape(val).replaceAll(",", " and ");
    return new Promise((resolve, reject) => {
      let that = this;
      this[Conn].query(
        "select * from ?? where " + sql,
        [this[TableName]],
        function (err, res) {
          if (err) {
            reject(err);
          }
          resolve(res);

          if (cache) {
            that[Cache](cache, res)
          }

        }
      );
    });
  }
  /**
   * @method save
   * @paramsType <T extends Record<string, string>
   */
  public async save<T extends Record<string, string> | Object>(val: T) {
    const fval = JSON.parse(JSON.stringify(val)); // filter undefined value

    const isbreak = await this[BF__INSERT].call(val);
    if (isbreak) {
      return isbreak;
    }

    return new Promise((resolve, reject) => {
      this[Conn].query(
        `insert into ??  SET ? `,
        [this[TableName], fval],
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
   *
   * @param val
   * @param options
   */

  public async update<T extends Record<string, string> | AdoOrmBaseEntity>(
    val: T
  ) {
    this[BF__UPDATE].call(val);

    const key = ref.get("key", this[BASEENITY].prototype);
    // @ts-ignore
    const keyVal = val[key]; // 得到索引的 Key 值
    const filterVal = __.omit(val, key); // 得到后面的key值

    return new Promise((resolve, reject) => {
      this[Conn].query(
        `update  ??  SET ? where ?? = ?`,
        [this[TableName], filterVal, key, keyVal],
        function (err, res) {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }

  public async getMany(val: string, options?: string[]): Promise<any>;

  public async getMany(
    val: string,
    options: string[],
  ): Promise<any>;

  public async getMany(val:string,options:string[],cache:cacheOptions):Promise<any>;

  public async getMany(
    sql: string,
    options?: string[],
    cache?: cacheOptions
  ) {
    if (cache) {
      const data = await this[GetCache](cache)
      if (data) {
        return data;
      }
    }

    return new Promise((resolve, reject) => {
      let that = this;
      this[Conn].query(sql, options, function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);

          if (cache) {
            that[Cache](cache, res)
          }
        }
      });
    });
  }
}
export { AdoOrmBaseEntity };
