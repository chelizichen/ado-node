"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdoOrmBaseEntity = void 0;
const core_1 = require("../core");
const client_1 = require("../error/client");
const dababase_1 = require("../error/dababase");
const protect_1 = require("../oper/protect");
const redis_1 = require("redis");
const lodash_1 = require("lodash");
const _1 = require(".");
const sql_1 = require("./sql");
const transaction_1 = require("./transaction");
class AdoOrmBaseEntity {
    [_1.BASEENITY];
    [_1.Conn];
    [_1.Target];
    [_1.TableName];
    [_1.RedisClient];
    constructor() {
        this[_1.Target] = AdoOrmBaseEntity.name;
        this[_1.RedisClient] = (0, redis_1.createClient)();
        this[_1.RedisClient].connect();
    }
    createTransaction() {
        const TranSactionInstance = new transaction_1.transaction();
        TranSactionInstance.__that__ = this;
        return TranSactionInstance;
    }
    createQueryBuilder() {
        return {
            query: new sql_1.query(),
            save: new sql_1.save(),
            update: new sql_1.update(),
            del: new sql_1.del(),
        };
    }
    async [_1.RunConfig](BaseEnity, dbname) {
        this[_1.BASEENITY] = BaseEnity;
        this[_1.TableName] = dbname;
        const Connection = core_1.ref.get(":pool", this[_1.BASEENITY].prototype);
        this[_1.Conn] = await Connection();
    }
    async [_1.Cache](key, value, cacheOptions) {
        if (cacheOptions) {
            if ((0, lodash_1.isObject)(cacheOptions) &&
                cacheOptions.cache &&
                cacheOptions.timeout) {
                console.log("1", key);
                this[_1.RedisClient].set(key, value);
                this[_1.RedisClient].expire(key, cacheOptions.timeout);
            }
            if ((0, lodash_1.isObject)(cacheOptions) &&
                !cacheOptions.cache &&
                cacheOptions.force &&
                cacheOptions.timeout) {
                console.log("2", key);
                this[_1.RedisClient].set(key, value);
                this[_1.RedisClient].expire(key, cacheOptions.timeout);
            }
            if ((0, lodash_1.isBoolean)(cacheOptions) && cacheOptions === true) {
                this[_1.RedisClient].set(key, value);
            }
        }
    }
    /**
     * @method getList
     * @description 获取所有的数据
     */
    async getList(page, size) {
        return new Promise((resolve, reject) => {
            this[_1.Conn].query(`select * from ?? limit ?,?`, [this[_1.TableName], parseInt(page), parseInt(size)], function (err, res) {
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
                cacheKey = `${this[_1.TableName]}:getOneBy:${val}`;
                console.log(cacheKey);
                if ((0, lodash_1.isObject)(cache) && !cache.force) {
                    let cacheVal = await this[_1.RedisClient].get(cacheKey);
                    if (cacheVal) {
                        return cacheVal;
                    }
                }
            }
            const key = core_1.ref.get("key", this[_1.BASEENITY].prototype);
            const count = (0, protect_1.getStrCount)(val, ["delete", "drop"]);
            if (count) {
                return new client_1.ClientError("非法参数,可能为恶意sql注入");
            }
            return new Promise((resolve) => {
                let _this = this;
                this[_1.Conn].query(`select * from ?? where ?? = ?`, [this[_1.TableName], key, val], function (err, res) {
                    if (err) {
                        resolve(new dababase_1.DataBaseError("数据库错误,也许配置项是非法的", err));
                    }
                    resolve(res);
                    if (isCache) {
                        _this[_1.Cache](cacheKey, JSON.stringify(res), cache);
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
        const key = core_1.ref.get("key", this[_1.BASEENITY].prototype);
        return new Promise((resolve, reject) => {
            this[_1.Conn].query(`DELETE FROM ?? WHERE ?? = ?`, [this[_1.TableName], key, val], function (err, res) {
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
            cacheKey = `${this[_1.TableName]}:getOneBy:${tostr}`;
            if ((0, lodash_1.isObject)(cache) && !cache.force) {
                let cacheVal = await this[_1.RedisClient].get(cacheKey);
                if (cacheVal) {
                    return cacheVal;
                }
            }
        }
        let countSql = `select count(*) as total from ?? where `;
        const jonitSql = this[_1.Conn].escape(val).replaceAll(",", " and ");
        return new Promise((resolve, reject) => {
            let _this = this;
            this[_1.Conn].query(countSql + jonitSql, [this[_1.TableName]], function (err, res) {
                if (err) {
                    reject(err);
                }
                const data = res[0];
                resolve(data);
                if (isCache) {
                    _this[_1.Cache](cacheKey, JSON.stringify(res), cache);
                }
            });
        });
    }
    async getBy(val, cache) {
        let cacheKey;
        const isCache = ((0, lodash_1.isObject)(cache) && cache.cache) || cache == true;
        if (isCache) {
            cacheKey = `${this[_1.TableName]}:getOneBy:${val}`;
            if ((0, lodash_1.isObject)(cache) && !cache.force) {
                let cacheVal = await this[_1.RedisClient].get(cacheKey);
                if (cacheVal) {
                    return cacheVal;
                }
            }
        }
        const sql = this[_1.Conn].escape(val).replaceAll(",", " and ");
        return new Promise((resolve, reject) => {
            let _this = this;
            this[_1.Conn].query("select * from ?? where " + sql, [this[_1.TableName]], function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
                if (isCache) {
                    _this[_1.Cache](cacheKey, JSON.stringify(res), cache);
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
            this[_1.Conn].query(`insert into ??  SET ? `, [this[_1.TableName], filterUndefined], function (err, res) {
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
            cacheKey = `${this[_1.TableName]}:getMany:${tojson}`;
            if ((0, lodash_1.isObject)(cache) && !cache.force) {
                let cacheVal = await this[_1.RedisClient].get(cacheKey);
                if (cacheVal) {
                    return cacheVal;
                }
            }
        }
        return new Promise((resolve, reject) => {
            let _this = this;
            this[_1.Conn].query(sql, options, function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                    if (isCache) {
                        _this[_1.Cache](cacheKey, JSON.stringify(res), cache);
                    }
                }
            });
        });
    }
}
exports.AdoOrmBaseEntity = AdoOrmBaseEntity;
//# sourceMappingURL=orm.js.map