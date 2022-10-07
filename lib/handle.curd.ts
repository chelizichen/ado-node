import SerivceMap from "./handle.service";
import { Request, Response } from "express";
import { ref } from "./handle.reflect";
import { EnityTable } from "./handle.enity";
import { CODE, MESSAGE } from "./constant";
import { getCachekey } from "./handle.cache";
import * as mysql from "mysql";
export type ClassConstructor = new (...args: any[]) => void;

const Curd = (
  CurdUrl: string,
  Enity: ClassConstructor,
  db: {
    name: string;
    obj: Function;
  },
  cache: {
    name: string;
    obj: Function;
  }
): MethodDecorator => {
  return function (
    _target: Object,
    _propertyKey: string | symbol,
    _descriptor: PropertyDescriptor
  ) {
    const client = ref.get(cache.name, cache.obj.prototype);
    const coon = ref.get(db.name, db.obj.prototype) as mysql.Connection;
    const url = createCurdUrl(CurdUrl);
    async function getListRet(req: Request, res: Response) {
      const options = req.query;
      const ListSql = createListSql(Enity, options);
      const cacheKey = getCachekey("list", Enity.name, options);
      const LinkRedis = await client();
      LinkRedis.connect();
      const data = await LinkRedis.hGet(Enity.name, cacheKey);
      if (data) {
        const _data = JSON.parse(data);
        _data.code = CODE.CACHE;
        _data.message = MESSAGE.CACHE;
        res.json(_data);
      } else {
        new Promise(async (resolve, reject) => {
          const _conn = await coon;
          await _conn.query(ListSql, async function (err, res) {
            if (err) {
              reject(err);
            } else {
              const data = {
                data: res[0],
                total: res[1][0].total,
                code: CODE.SUCCESS,
                message: MESSAGE.SUCCESS,
              };
              await LinkRedis.hSet(Enity.name, cacheKey, JSON.stringify(data));
              await LinkRedis.expire(Enity.name, 120);
              resolve(data);
            }
          });
        }).then((ret) => {
          res.json(ret);
        });
      }
    }
    async function getGetRet(req: Request, res: Response) {
      const options = req.query;
      const GetSql = createGetSql(Enity, options);
      const key = ref.get("key", Enity.prototype);
      options.key = key;
      options.value = options[key];
      const cacheKey = getCachekey("get", Enity.name, options);
      const LinkRedis = await client();
      LinkRedis.connect();
      const data = await LinkRedis.hGet(Enity.name, cacheKey);
      if (data) {
        const _data = JSON.parse(data);
        _data.code = CODE.CACHE;
        _data.message = MESSAGE.CACHE;
        res.json(_data);
      } else {
        new Promise(async (resolve, reject) => {
          const _conn = await coon;
          _conn.query(GetSql, function (err, res) {
            if (err) {
              reject(err);
            } else {
              const data = {
                data: res[0],
                total: res[1][0].total,
                code: CODE.SUCCESS,
                message: CODE.SUCCESS,
              };
              LinkRedis.hSet(Enity.name, cacheKey, JSON.stringify(data));
              resolve(data);
            }
          });
        }).then((ret) => {
          res.json(ret);
        });
      }
    }
    async function getDelRet(req: Request, res: Response) {
      const options = req.query;
      const DelSql = createDelSql(Enity, options);
      const key = ref.get("key", Enity.prototype);
      options.key = key;
      options.value = options[key];
      const LinkRedis = await client();
      LinkRedis.connect();
      const cacheKey = getCachekey("get", Enity.name, options);
      new Promise(async (resolve, reject) => {
        const _conn = await coon;
        _conn.query(DelSql, function (err, res) {
          if (err) {
            reject(err);
          } else {
            if (res.affectedRows > 0) {
              const data = {
                affect: res.affectedRows,
                code: CODE.SUCCESS,
                msg: MESSAGE.SUCCESS,
              };
              LinkRedis.hDel(Enity.name, cacheKey);
              resolve(data);
            } else {
              const data = {
                affect: res.affectedRows,
                code: CODE.ERROR,
                msg: MESSAGE.ERROR,
              };
              resolve(data);
            }
          }
        });
      }).then((ret) => {
        res.json(ret);
      });
    }
    async function getAddRet(req: Request, res: Response) {
      const options = req.body;
      const UpdateSql = createAddSql(Enity, options);
      const key = ref.get("key", Enity.prototype);
      options.key = key;
      options.value = options[key];
      const cacheKey = getCachekey("update", Enity.name, options);
      const LinkRedis = await client();
      LinkRedis.connect();
      new Promise(async (resolve, reject) => {
        const _conn = await coon;
        _conn.query(UpdateSql, function (err, res) {
          if (err) {
            reject(err);
          } else {
            LinkRedis.hDel(Enity.name, cacheKey);
            resolve(res);
          }
        });
      }).then((ret) => {
        res.json(ret);
      });
    }
    async function getUpdateRet(req: Request, res: Response) {
      const options = req.body;
      const ListSql = createUpdateSql(Enity, options);
      new Promise((resolve, reject) => {
        coon.query(ListSql, function (err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      }).then(async (ret) => {
        const keys = await client.hKeys(Enity.name);
        keys.forEach((el: any) => {
          client.hDel(Enity.name, el);
        });
        res.json(ret);
      });
    }
    SerivceMap.set(url.get.get, {
      fn: getGetRet,
      method: "Get",
    });
    SerivceMap.set(url.get.list, {
      fn: getListRet,
      method: "Get",
    });
    SerivceMap.set(url.get.del, {
      fn: getDelRet,
      method: "Get",
    });
    SerivceMap.set(url.post.modify, {
      fn: getUpdateRet,
      method: "Post",
    });
    SerivceMap.set(url.post.add, {
      fn: getAddRet,
      method: "Post",
    });
  };
};

function createCurdUrl(CurdUrl: string) {
  return {
    get: {
      list: `${CurdUrl}/list`,
      del: `${CurdUrl}/del`,
      get: `${CurdUrl}/get`,
    },
    post: {
      modify: `${CurdUrl}/update`,
      add: `${CurdUrl}/add`,
    },
  };
}
function createListSql(Enity: ClassConstructor, options: any) {
  const keyword = ref.get("keyword", Enity.prototype);
  if (options.keyword && options.page && options.size) {
    return `
      select SQL_CALC_FOUND_ROWS * from ${Enity.name} where ${keyword} like 
     '%${options.keyword}%' limit ${options.page - 1},${options.size};
      SELECT FOUND_ROWS() as total;
    `;
  }
  if (options.page && options.size) {
    const sql = `
      select SQL_CALC_FOUND_ROWS * from ${Enity.name} limit 
      ${options.page - 1},${options.size} ;
      SELECT FOUND_ROWS() as total;
    `;
    return sql;
  }
  if (options.keyword && !options.page && !options.size) {
    const sql = `
      select  SQL_CALC_FOUND_ROWS * from ${Enity.name} 
      where ${keyword} like '%${options.keyword}%' limit 0,10 ;
      SELECT FOUND_ROWS() as total;
    `;
    return sql;
  }
  return `
    SELECT  * from ${Enity.name} limit 0,10;
    SELECT FOUND_ROWS() as total;
  `;
}
function createGetSql(Enity: ClassConstructor, options: any) {
  const key = ref.get("key", Enity.prototype);
  return `select SQL_CALC_FOUND_ROWS * from ${Enity.name} where ${key} = ${options[key]};SELECT FOUND_ROWS() as total;`;
}
function createDelSql(Enity: ClassConstructor, options: any) {
  const key = ref.get("key", Enity.prototype);
  return `DELETE  from ${Enity.name} where ${key} = ${options[key]}`;
}
function createAddSql(Enity: ClassConstructor, options: any) {
  let fields: Array<string> = EnityTable.get(Enity.name);
  if (!fields) {
    fields = Object.getOwnPropertyNames(new Enity());
    EnityTable.set(Enity.name, fields);
  }
  const key = ref.get("key", Enity.prototype);
  const opt = fields.filter((el) => el != key);
  const val = opt.map((el) => {
    return options[el];
  });
  return `insert into ${
    Enity.name
  }(${opt.toString()}) values  (${val.toString()})`;
}
function createUpdateSql(Enity: ClassConstructor, options: any) {
  let fields: Array<string> = EnityTable.get(Enity.name);
  if (!fields) {
    fields = Object.getOwnPropertyNames(new Enity());
    EnityTable.set(Enity.name, fields);
  }
  const key = ref.get("key", Enity.prototype);
  const opt = fields.filter((el) => el != key);
  const val = opt.map((el) => {
    return {
      [el]: options[el],
    };
  });
  const keySqlVal = `${key} = ${options[key]}`;
  const sqlVal = val.reduce((pre, item, index) => {
    const itemName: any = Object.getOwnPropertyNames(item);
    const itemValue = item[itemName];
    let sql;
    if (index == val.length - 1) {
      sql = `${itemName} = ${itemValue}`;
    } else {
      sql = `${itemName} = ${itemValue},`;
    }
    return pre + sql;
  }, "");
  const sql = `Update ${Enity.name} Set ${sqlVal} WHERE ${keySqlVal}`;
  return sql;
}

export { Curd };
