"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Curd = void 0;
const service_1 = require("../ioc/service");
const ref_1 = require("../ioc/ref");
const constant_1 = require("../constant/constant");
const cache_1 = require("../store/cache");
const enity_1 = require("../store/enity");
const Curd = (CurdUrl, Enity, store, commonClass) => {
    return function (_target, _propertyKey, _descriptor) {
        const coon = ref_1.ref.get(store[0], commonClass.prototype);
        const client = ref_1.ref.get(store[1], commonClass.prototype);
        const url = createCurdUrl(CurdUrl);
        async function getListRet(req, res) {
            const options = req.query;
            const ListSql = createListSql(Enity, options);
            const cacheKey = (0, cache_1.getCachekey)("list", Enity.name, options);
            const LinkRedis = await client();
            LinkRedis.connect();
            const data = await LinkRedis.hGet(Enity.name, cacheKey);
            if (data) {
                const _data = JSON.parse(data);
                _data.code = constant_1.CODE.CACHE;
                _data.message = constant_1.MESSAGE.CACHE;
                res.json(_data);
            }
            else {
                new Promise(async (resolve, reject) => {
                    const _conn = await coon;
                    await _conn.query(ListSql, async function (err, res) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            const data = {
                                data: res[0],
                                total: res[1][0].total,
                                code: constant_1.CODE.SUCCESS,
                                message: constant_1.MESSAGE.SUCCESS,
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
        async function getGetRet(req, res) {
            const options = req.query;
            const GetSql = createGetSql(Enity, options);
            const key = ref_1.ref.get("key", Enity.prototype);
            options.key = key;
            options.value = options[key];
            const cacheKey = (0, cache_1.getCachekey)("get", Enity.name, options);
            const LinkRedis = await client();
            LinkRedis.connect();
            const data = await LinkRedis.hGet(Enity.name, cacheKey);
            if (data) {
                const _data = JSON.parse(data);
                _data.code = constant_1.CODE.CACHE;
                _data.message = constant_1.MESSAGE.CACHE;
                res.json(_data);
            }
            else {
                new Promise(async (resolve, reject) => {
                    const _conn = await coon;
                    _conn.query(GetSql, function (err, res) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            const data = {
                                data: res[0],
                                total: res[1][0].total,
                                code: constant_1.CODE.SUCCESS,
                                message: constant_1.CODE.SUCCESS,
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
        async function getDelRet(req, res) {
            const options = req.query;
            const DelSql = createDelSql(Enity, options);
            const key = ref_1.ref.get("key", Enity.prototype);
            options.key = key;
            options.value = options[key];
            const LinkRedis = await client();
            LinkRedis.connect();
            const cacheKey = (0, cache_1.getCachekey)("get", Enity.name, options);
            new Promise(async (resolve, reject) => {
                const _conn = await coon;
                _conn.query(DelSql, function (err, res) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        if (res.affectedRows > 0) {
                            const data = {
                                affect: res.affectedRows,
                                code: constant_1.CODE.SUCCESS,
                                msg: constant_1.MESSAGE.SUCCESS,
                            };
                            LinkRedis.hDel(Enity.name, cacheKey);
                            resolve(data);
                        }
                        else {
                            const data = {
                                affect: res.affectedRows,
                                code: constant_1.CODE.ERROR,
                                msg: constant_1.MESSAGE.ERROR,
                            };
                            resolve(data);
                        }
                    }
                });
            }).then((ret) => {
                res.json(ret);
            });
        }
        async function getAddRet(req, res) {
            const options = req.body;
            const UpdateSql = createAddSql(Enity, options);
            const key = ref_1.ref.get("key", Enity.prototype);
            options.key = key;
            options.value = options[key];
            const cacheKey = (0, cache_1.getCachekey)("update", Enity.name, options);
            const LinkRedis = await client();
            LinkRedis.connect();
            new Promise(async (resolve, reject) => {
                const _conn = await coon;
                _conn.query(UpdateSql, function (err, res) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        LinkRedis.hDel(Enity.name, cacheKey);
                        resolve(res);
                    }
                });
            }).then((ret) => {
                res.json(ret);
            });
        }
        async function getUpdateRet(req, res) {
            const options = req.body;
            const ListSql = createUpdateSql(Enity, options);
            new Promise((resolve, reject) => {
                coon.query(ListSql, function (err, res) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(res);
                    }
                });
            }).then(async (ret) => {
                const keys = await client.hKeys(Enity.name);
                keys.forEach((el) => {
                    client.hDel(Enity.name, el);
                });
                res.json(ret);
            });
        }
        service_1.SerivceMap.set(url.get.get, {
            fn: getGetRet,
            method: "Get",
        });
        service_1.SerivceMap.set(url.get.list, {
            fn: getListRet,
            method: "Get",
        });
        service_1.SerivceMap.set(url.get.del, {
            fn: getDelRet,
            method: "Get",
        });
        service_1.SerivceMap.set(url.post.modify, {
            fn: getUpdateRet,
            method: "Post",
        });
        service_1.SerivceMap.set(url.post.add, {
            fn: getAddRet,
            method: "Post",
        });
    };
};
exports.Curd = Curd;
function createCurdUrl(CurdUrl) {
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
function createListSql(Enity, options) {
    const keyword = ref_1.ref.get("keyword", Enity.prototype);
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
function createGetSql(Enity, options) {
    const key = ref_1.ref.get("key", Enity.prototype);
    return `select SQL_CALC_FOUND_ROWS * from ${Enity.name} where ${key} = ${options[key]};SELECT FOUND_ROWS() as total;`;
}
function createDelSql(Enity, options) {
    const key = ref_1.ref.get("key", Enity.prototype);
    return `DELETE  from ${Enity.name} where ${key} = ${options[key]}`;
}
function createAddSql(Enity, options) {
    let fields = enity_1.EnityTable.get(Enity.name);
    if (!fields) {
        fields = Object.getOwnPropertyNames(new Enity());
        enity_1.EnityTable.set(Enity.name, fields);
    }
    const key = ref_1.ref.get("key", Enity.prototype);
    const opt = fields.filter((el) => el != key);
    const val = opt.map((el) => {
        return options[el];
    });
    return `insert into ${Enity.name}(${opt.toString()}) values  (${val.toString()})`;
}
function createUpdateSql(Enity, options) {
    let fields = enity_1.EnityTable.get(Enity.name);
    if (!fields) {
        fields = Object.getOwnPropertyNames(new Enity());
        enity_1.EnityTable.set(Enity.name, fields);
    }
    const key = ref_1.ref.get("key", Enity.prototype);
    const opt = fields.filter((el) => el != key);
    const val = opt.map((el) => {
        return {
            [el]: options[el],
        };
    });
    const keySqlVal = `${key} = ${options[key]}`;
    const sqlVal = val.reduce((pre, item, index) => {
        const itemName = Object.getOwnPropertyNames(item);
        const itemValue = item[itemName];
        let sql;
        if (index == val.length - 1) {
            sql = `${itemName} = ${itemValue}`;
        }
        else {
            sql = `${itemName} = ${itemValue},`;
        }
        return pre + sql;
    }, "");
    const sql = `Update ${Enity.name} Set ${sqlVal} WHERE ${keySqlVal}`;
    return sql;
}
//# sourceMappingURL=curd.js.map