import * as mysql from "mysql";
import { ref } from "../core";
import { ClientError } from "../error/client";
import { DataBaseError } from "../error/dababase";
import { getStrCount } from "../oper/protect";
import { RedisClientType, createClient } from "redis";
import { isBoolean, isObject } from "lodash";
import * as __ from "lodash";
import {
  BASEENITY,
  Conn,
  Target,
  TableName,
  querybuilder,
  RunConfig,
  cacheOptions,
  Cache,
  RedisClient,
  BF__DELETE,
  BF__INSERT,
  BF__UPDATE,
  VoidFunction,
} from "./index";
import { query, update, del, save } from "./sql";
import { transaction } from "./transaction";

function void_fn() {}

class AdoOrmBaseEntity {
  public [BASEENITY]!: Function;
  public [Conn]!: mysql.PoolConnection;
  public [Target]: any;
  public [TableName]!: string;
  public [RedisClient]: RedisClientType;
  public [BF__DELETE]!: Function;
  public [BF__INSERT]!: Function;
  public [BF__UPDATE]!: Function;
  public [VoidFunction]() {}

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

  public async [RunConfig](BaseEnity: Function, dbname: string) {
    this[BASEENITY] = BaseEnity;
    this[TableName] = dbname;
    const Connection = ref.get(":pool", this[BASEENITY].prototype);

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

    this[Conn] = await Connection();
  }

  public async [Cache](key: string, value: string): Promise<void>;

  public async [Cache](
    key: string,
    value: string,
    cacheOptions: boolean
  ): Promise<void>;

  public async [Cache](
    key: string,
    value: string,
    cacheOptions: cacheOptions
  ): Promise<void>;

  public async [Cache](
    key: string,
    value: string,
    cacheOptions?: boolean | cacheOptions
  ): Promise<void> {
    if (cacheOptions) {
      if (
        isObject(cacheOptions) &&
        cacheOptions.cache &&
        cacheOptions.timeout
      ) {
        this[RedisClient].expire(key, cacheOptions.timeout);
      }
      if (
        isObject(cacheOptions) &&
        !cacheOptions.cache &&
        cacheOptions.force &&
        cacheOptions.timeout
      ) {
        this[RedisClient].set(key, value);
        this[RedisClient].expire(key, cacheOptions.timeout);
      }
      if (isBoolean(cacheOptions) && cacheOptions === true) {
        this[RedisClient].set(key, value);
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

  public async getOneBy(val: string): Promise<any>;

  public async getOneBy(val: string, cache: boolean): Promise<any>;

  public async getOneBy(val: string, cache?: cacheOptions): Promise<any>;

  public async getOneBy(
    val: string,
    cache?: cacheOptions | boolean
  ): Promise<any> {
    {
      let cacheKey: string;

      const isCache = (isObject(cache) && cache.cache) || cache == true;

      if (isCache) {
        cacheKey = `${this[TableName]}:getOneBy:${val}`;
        console.log(cacheKey);
        if (isObject(cache) && !cache.force) {
          let cacheVal = await this[RedisClient].get(cacheKey);
          if (cacheVal) {
            return cacheVal;
          }
        }
      }

      const key = ref.get("key", this[BASEENITY].prototype);
      const count = getStrCount(val, ["delete", "drop"]);

      if (count) {
        return new ClientError("非法参数,可能为恶意sql注入");
      }

      return new Promise((resolve) => {
        let _this = this;
        this[Conn].query(
          `select * from ?? where ?? = ?`,
          [this[TableName], key, val],
          function (err, res) {
            if (err) {
              resolve(new DataBaseError("数据库错误,也许配置项是非法的", err));
            }
            resolve(res);

            if (isCache) {
              _this[Cache](
                cacheKey,
                JSON.stringify(res),
                cache as cacheOptions
              );
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
    cache?: boolean
  ): Promise<any>;

  public async countBy(
    val: Record<string, string>,
    cache?: cacheOptions
  ): Promise<any>;

  public async countBy(
    val: Record<string, string>,
    cache?: cacheOptions | boolean
  ) {
    let cacheKey: string;

    const isCache = (isObject(cache) && cache.cache) || cache == true;

    if (isCache) {
      let tostr = JSON.stringify(val);
      cacheKey = `${this[TableName]}:getOneBy:${tostr}`;
      if (isObject(cache) && !cache.force) {
        let cacheVal = await this[RedisClient].get(cacheKey);
        if (cacheVal) {
          return cacheVal;
        }
      }
    }

    let countSql = `select count(*) as total from ?? where `;
    const jonitSql = this[Conn].escape(val).replaceAll(",", " and ");
    return new Promise((resolve, reject) => {
      let _this = this;
      this[Conn].query(
        countSql + jonitSql,
        [this[TableName]],
        function (err, res) {
          if (err) {
            reject(err);
          }
          const data = res[0];
          resolve(data);

          if (isCache) {
            _this[Cache](cacheKey, JSON.stringify(res), cache as cacheOptions);
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
    cache?: boolean
  ): Promise<any>;

  public async getBy(
    val: Record<string, string>,
    cache?: cacheOptions
  ): Promise<any>;

  public async getBy(
    val: Record<string, string>,
    cache?: cacheOptions | boolean
  ) {
    let cacheKey: string;

    const isCache = (isObject(cache) && cache.cache) || cache == true;

    if (isCache) {
      cacheKey = `${this[TableName]}:getOneBy:${val}`;
      if (isObject(cache) && !cache.force) {
        let cacheVal = await this[RedisClient].get(cacheKey);
        if (cacheVal) {
          return cacheVal;
        }
      }
    }

    const sql = this[Conn].escape(val).replaceAll(",", " and ");
    return new Promise((resolve, reject) => {
      let _this = this;
      this[Conn].query(
        "select * from ?? where " + sql,
        [this[TableName]],
        function (err, res) {
          if (err) {
            reject(err);
          }
          resolve(res);
          if (isCache) {
            _this[Cache](cacheKey, JSON.stringify(res), cache as cacheOptions);
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
    const fval = JSON.parse(JSON.stringify(val)); // 过滤掉undefined 值

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
    cache: boolean
  ): Promise<any>;

  public async getMany(
    val: string,
    options: string[],
    cache?: cacheOptions
  ): Promise<any>;

  public async getMany(
    sql: string,
    options?: string[],
    cache?: cacheOptions | boolean
  ) {
    let cacheKey: string;

    const isCache = (isObject(cache) && cache.cache) || cache == true;

    if (isCache) {
      const tojson = JSON.stringify(options);
      cacheKey = `${this[TableName]}:getMany:${tojson}`;
      if (isObject(cache) && !cache.force) {
        let cacheVal = await this[RedisClient].get(cacheKey);
        if (cacheVal) {
          return cacheVal;
        }
      }
    }

    return new Promise((resolve, reject) => {
      let _this = this;
      this[Conn].query(sql, options, function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
          if (isCache) {
            _this[Cache](cacheKey, JSON.stringify(res), cache as cacheOptions);
          }
        }
      });
    });
  }
}
export { AdoOrmBaseEntity };
