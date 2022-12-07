"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdoOrmBaseEnity = exports.TableName = exports.GetConn = exports.Target = exports.Conn = exports.BASEENITY = exports.RunConfig = void 0;
// import { AdoBaseConfig } from "../config";
const core_1 = require("../core");
const client_1 = require("../error/client");
const dababase_1 = require("../error/dababase");
const protect_1 = require("../oper/protect");
const sql_1 = require("./sql");
const redis_1 = require("redis");
const lodash_1 = require("lodash");
exports.RunConfig = Symbol("RUNCONFIG");
exports.BASEENITY = Symbol("BASEENITY");
exports.Conn = Symbol("CONN");
exports.Target = Symbol("TARGET");
exports.GetConn = Symbol("GETCONN");
exports.TableName = Symbol("TableName");
const Cache = Symbol("CACHE");
class AdoOrmBaseEnity {
    [exports.BASEENITY];
    [exports.Conn];
    [exports.Target];
    [exports.TableName];
    RedisClient;
    constructor() {
        this[exports.Target] = AdoOrmBaseEnity.name;
        this.RedisClient = (0, redis_1.createClient)();
        this.RedisClient.connect();
    }
    createQueryBuilder() {
        return {
            query: new sql_1.query(),
            save: new sql_1.save(),
            update: new sql_1.update(),
            del: new sql_1.del(),
        };
    }
    async [exports.RunConfig](BaseEnity, dbname) {
        this[exports.BASEENITY] = BaseEnity;
        this[exports.TableName] = dbname;
        this[exports.GetConn]();
    }
    async [exports.GetConn]() {
        const Connection = core_1.ref.get(":pool", this[exports.BASEENITY].prototype);
        this[exports.Conn] = await Connection();
    }
    async [Cache](key, value, cacheOptions) {
        if (cacheOptions) {
            if ((0, lodash_1.isObject)(cacheOptions) &&
                cacheOptions.cache &&
                cacheOptions.timeout) {
                console.log("1", key);
                this.RedisClient.set(key, value);
                this.RedisClient.expire(key, cacheOptions.timeout);
            }
            if ((0, lodash_1.isObject)(cacheOptions) &&
                !cacheOptions.cache &&
                cacheOptions.force &&
                cacheOptions.timeout) {
                console.log("2", key);
                this.RedisClient.set(key, value);
                this.RedisClient.expire(key, cacheOptions.timeout);
            }
            if ((0, lodash_1.isBoolean)(cacheOptions) && cacheOptions === true) {
                this.RedisClient.set(key, value);
            }
        }
    }
    /**
     * @method getList
     * @description 获取所有的数据
     */
    async getList(page, size) {
        return new Promise((resolve, reject) => {
            this[exports.Conn].query(`select * from ?? limit ?,?`, [this[exports.TableName], parseInt(page), parseInt(size)], function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }
    async getOneBy(val, cache) {
        {
            let cacheKey;
            const isCache = ((0, lodash_1.isObject)(cache) && cache.cache) || cache == true;
            if (isCache) {
                cacheKey = `${this[exports.TableName]}:getOneBy:${val}`;
                console.log(cacheKey);
                if ((0, lodash_1.isObject)(cache) && !cache.force) {
                    let cacheVal = await this.RedisClient.get(cacheKey);
                    if (cacheVal) {
                        return cacheVal;
                    }
                }
            }
            const key = core_1.ref.get("key", this[exports.BASEENITY].prototype);
            const count = (0, protect_1.getStrCount)(val, ["delete", "drop"]);
            if (count) {
                return new client_1.ClientError("非法参数,可能为恶意sql注入");
            }
            return new Promise((resolve) => {
                let _this = this;
                this[exports.Conn].query(`select * from ?? where ?? = ?`, [this[exports.TableName], key, val], function (err, res) {
                    if (err) {
                        resolve(new dababase_1.DataBaseError("数据库错误,也许配置项是非法的", err));
                    }
                    resolve(res);
                    if (isCache) {
                        _this[Cache](cacheKey, JSON.stringify(res), cache);
                    }
                });
            });
        }
    }
    /**
     * @method delOneBy
     * @description 单独根据Key 值来删除
     */
    async delOneBy(val) {
        const key = core_1.ref.get("key", this[exports.BASEENITY].prototype);
        return new Promise((resolve, reject) => {
            this[exports.Conn].query(`DELETE FROM ?? WHERE ?? = ?`, [this[exports.TableName], key, val], function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }
    async countBy(val, cache) {
        let cacheKey;
        const isCache = ((0, lodash_1.isObject)(cache) && cache.cache) || cache == true;
        if (isCache) {
            let tostr = JSON.stringify(val);
            cacheKey = `${this[exports.TableName]}:getOneBy:${tostr}`;
            if ((0, lodash_1.isObject)(cache) && !cache.force) {
                let cacheVal = await this.RedisClient.get(cacheKey);
                if (cacheVal) {
                    return cacheVal;
                }
            }
        }
        let countSql = `select count(*) as total from ?? where `;
        const jonitSql = this[exports.Conn].escape(val).replaceAll(",", " and ");
        return new Promise((resolve, reject) => {
            let _this = this;
            this[exports.Conn].query(countSql + jonitSql, [this[exports.TableName]], function (err, res) {
                if (err) {
                    reject(err);
                }
                const data = res[0];
                resolve(data);
                if (isCache) {
                    _this[Cache](cacheKey, JSON.stringify(res), cache);
                }
            });
        });
    }
    async getBy(val, cache) {
        let cacheKey;
        const isCache = ((0, lodash_1.isObject)(cache) && cache.cache) || cache == true;
        if (isCache) {
            cacheKey = `${this[exports.TableName]}:getOneBy:${val}`;
            if ((0, lodash_1.isObject)(cache) && !cache.force) {
                let cacheVal = await this.RedisClient.get(cacheKey);
                if (cacheVal) {
                    return cacheVal;
                }
            }
        }
        const sql = this[exports.Conn].escape(val).replaceAll(",", " and ");
        return new Promise((resolve, reject) => {
            let _this = this;
            this[exports.Conn].query("select * from ?? where " + sql, [this[exports.TableName]], function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
                if (isCache) {
                    _this[Cache](cacheKey, JSON.stringify(res), cache);
                }
            });
        });
    }
    /**
     * @method save
     * @paramsType <T extends Record<string, string>
     */
    async save(val) {
        const filterUndefined = JSON.parse(JSON.stringify(val));
        return new Promise((resolve, reject) => {
            this[exports.Conn].query(`insert into ??  SET ? `, [this[exports.TableName], filterUndefined], function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }
    async getMany(sql, options, cache) {
        let cacheKey;
        const isCache = ((0, lodash_1.isObject)(cache) && cache.cache) || cache == true;
        if (isCache) {
            const tojson = JSON.stringify(options);
            cacheKey = `${this[exports.TableName]}:getMany:${tojson}`;
            if ((0, lodash_1.isObject)(cache) && !cache.force) {
                let cacheVal = await this.RedisClient.get(cacheKey);
                if (cacheVal) {
                    return cacheVal;
                }
            }
        }
        return new Promise((resolve, reject) => {
            let _this = this;
            this[exports.Conn].query(sql, options, function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                    if (isCache) {
                        _this[Cache](cacheKey, JSON.stringify(res), cache);
                    }
                }
            });
        });
    }
}
exports.AdoOrmBaseEnity = AdoOrmBaseEnity;
//# sourceMappingURL=orm.js.map