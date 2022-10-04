import SerivceMap from "./handle.service";
import * as mysql from "mysql";
import { Request, Response } from "express";
import { ref } from "./handle.reflect";
import { EnityTable } from "./handle.enity";

type ClassConstructor = new (...args: any[]) => void;

const Curd = (
  CurdUrl: string,
  Enity: ClassConstructor,
  coon: mysql.Connection
): MethodDecorator => {
  return function (
    _target: Object,
    _propertyKey: string | symbol,
    _descriptor: PropertyDescriptor
  ) {
    const url = createCurdUrl(CurdUrl);
    function getListRet(req: Request, res: Response) {
      const options = req.query;
      const ListSql = createListSql(Enity, options);
      new Promise((resolve, reject) => {
        coon.query(ListSql, function (err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      }).then((ret) => {
        // @ts-ignore
        res.json(ret);
      });
    }
    function getGetRet(req: Request, res: Response) {
      const options = req.query;
      const GetSql = createGetSql(Enity, options);
      new Promise((resolve, reject) => {
        coon.query(GetSql, function (err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      }).then((ret) => {
        // @ts-ignore
        res.json(ret);
      });
    }
    function getDelRet(req: Request, res: Response) {
      const options = req.query;
      const DelSql = createDelSql(Enity, options);
      new Promise((resolve, reject) => {
        coon.query(DelSql, function (err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      }).then((ret) => {
        // @ts-ignore
        res.json(ret);
      });
    }
    function getAddRet(req: Request, res: Response) {
      const options = req.body;
      const UpdateSql = createAddSql(Enity, options);
      new Promise((resolve, reject) => {
        coon.query(UpdateSql, function (err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      }).then((ret) => {
        // @ts-ignore
        res.json(ret);
      });
    }
    function getUpdateRet(req: Request, res: Response) {
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
      }).then((ret) => {
        // @ts-ignore
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
    return `select * from ${Enity.name} where ${keyword} like '%${
      options.keyword
    }%' limit ${options.page - 1},${options.size}`;
  }
  if (options.page && options.size) {
    return `select * from ${Enity.name} limit ${options.page - 1},${
      options.size
    }`;
  }
  if (options.keyword && !options.page && !options.size) {
    return `select * from ${Enity.name} where ${keyword} like '%${options.keyword}%' limit 0,10`;
  }
  return `select * from ${Enity.name} limit 0,10`;
}
function createGetSql(Enity: ClassConstructor, options: any) {
  const key = ref.get("key", Enity.prototype);
  return `select * from ${Enity.name} where ${key} = ${options.id}`;
}
function createDelSql(Enity: ClassConstructor, options: any) {
  return `select * from ${Enity.name} where id = ${options.id}`;
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
