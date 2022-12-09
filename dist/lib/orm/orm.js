"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdoOrmBaseEntity = void 0;
const core_1 = require("../core");
const client_1 = require("../error/client");
const dababase_1 = require("../error/dababase");
const protect_1 = require("../oper/protect");
const redis_1 = require("redis");
const lodash_1 = require("lodash");
const __ = __importStar(require("lodash"));
const index_1 = require("./index");
const sql_1 = require("./sql");
const transaction_1 = require("./transaction");
function void_fn() { }
class AdoOrmBaseEntity {
    [index_1.BASEENITY];
    [index_1.Conn];
    [index_1.Target];
    [index_1.TableName];
    [index_1.RedisClient];
    [index_1.BF__DESTORY];
    [index_1.BF__INSERT];
    [index_1.BF__UPDATE];
    [index_1.VoidFunction]() { }
    constructor() {
        this[index_1.Target] = AdoOrmBaseEntity.name;
        this[index_1.RedisClient] = (0, redis_1.createClient)();
        this[index_1.RedisClient].connect();
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
    async [index_1.RunConfig](BaseEnity, dbname) {
        this[index_1.BASEENITY] = BaseEnity;
        this[index_1.TableName] = dbname;
        const Connection = core_1.ref.get(":pool", this[index_1.BASEENITY].prototype);
        const bf_destory = core_1.ref.get("monitor", this[index_1.BASEENITY].prototype, ":before-destory");
        this[index_1.BF__DESTORY] = bf_destory != undefined ? bf_destory : void_fn;
        const bf_insert = core_1.ref.get("monitor", this[index_1.BASEENITY].prototype, ":before-insert");
        this[index_1.BF__INSERT] = bf_insert != undefined ? bf_insert : void_fn;
        const bf_update = core_1.ref.get("monitor", this[index_1.BASEENITY].prototype, ":before-update");
        this[index_1.BF__UPDATE] = bf_update != undefined ? bf_update : void_fn;
        this[index_1.Conn] = await Connection();
    }
    async [index_1.Cache](key, value, cacheOptions) {
        if (cacheOptions) {
            if ((0, lodash_1.isObject)(cacheOptions) &&
                cacheOptions.cache &&
                cacheOptions.timeout) {
                this[index_1.RedisClient].expire(key, cacheOptions.timeout);
            }
            if ((0, lodash_1.isObject)(cacheOptions) &&
                !cacheOptions.cache &&
                cacheOptions.force &&
                cacheOptions.timeout) {
                this[index_1.RedisClient].set(key, value);
                this[index_1.RedisClient].expire(key, cacheOptions.timeout);
            }
            if ((0, lodash_1.isBoolean)(cacheOptions) && cacheOptions === true) {
                this[index_1.RedisClient].set(key, value);
            }
        }
    }
    /**
     * @method getList
     * @description 获取所有的数据
     */
    async getList(page, size) {
        return new Promise((resolve, reject) => {
            this[index_1.Conn].query(`select * from ?? limit ?,?`, [this[index_1.TableName], parseInt(page), parseInt(size)], function (err, res) {
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
                cacheKey = `${this[index_1.TableName]}:getOneBy:${val}`;
                console.log(cacheKey);
                if ((0, lodash_1.isObject)(cache) && !cache.force) {
                    let cacheVal = await this[index_1.RedisClient].get(cacheKey);
                    if (cacheVal) {
                        return cacheVal;
                    }
                }
            }
            const key = core_1.ref.get("key", this[index_1.BASEENITY].prototype);
            const count = (0, protect_1.getStrCount)(val, ["delete", "drop"]);
            if (count) {
                return new client_1.ClientError("非法参数,可能为恶意sql注入");
            }
            return new Promise((resolve) => {
                let _this = this;
                this[index_1.Conn].query(`select * from ?? where ?? = ?`, [this[index_1.TableName], key, val], function (err, res) {
                    if (err) {
                        resolve(new dababase_1.DataBaseError("数据库错误,也许配置项是非法的", err));
                    }
                    resolve(res);
                    if (isCache) {
                        _this[index_1.Cache](cacheKey, JSON.stringify(res), cache);
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
        this[index_1.BF__DESTORY].call(val);
        const key = core_1.ref.get("key", this[index_1.BASEENITY].prototype);
        return new Promise((resolve, reject) => {
            this[index_1.Conn].query(`DELETE FROM ?? WHERE ?? = ?`, [this[index_1.TableName], key, val], function (err, res) {
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
            cacheKey = `${this[index_1.TableName]}:getOneBy:${tostr}`;
            if ((0, lodash_1.isObject)(cache) && !cache.force) {
                let cacheVal = await this[index_1.RedisClient].get(cacheKey);
                if (cacheVal) {
                    return cacheVal;
                }
            }
        }
        let countSql = `select count(*) as total from ?? where `;
        const jonitSql = this[index_1.Conn].escape(val).replaceAll(",", " and ");
        return new Promise((resolve, reject) => {
            let _this = this;
            this[index_1.Conn].query(countSql + jonitSql, [this[index_1.TableName]], function (err, res) {
                if (err) {
                    reject(err);
                }
                const data = res[0];
                resolve(data);
                if (isCache) {
                    _this[index_1.Cache](cacheKey, JSON.stringify(res), cache);
                }
            });
        });
    }
    async getBy(val, cache) {
        let cacheKey;
        const isCache = ((0, lodash_1.isObject)(cache) && cache.cache) || cache == true;
        if (isCache) {
            cacheKey = `${this[index_1.TableName]}:getOneBy:${val}`;
            if ((0, lodash_1.isObject)(cache) && !cache.force) {
                let cacheVal = await this[index_1.RedisClient].get(cacheKey);
                if (cacheVal) {
                    return cacheVal;
                }
            }
        }
        const sql = this[index_1.Conn].escape(val).replaceAll(",", " and ");
        return new Promise((resolve, reject) => {
            let _this = this;
            this[index_1.Conn].query("select * from ?? where " + sql, [this[index_1.TableName]], function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
                if (isCache) {
                    _this[index_1.Cache](cacheKey, JSON.stringify(res), cache);
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
        this[index_1.BF__INSERT].call(val);
        return new Promise((resolve, reject) => {
            this[index_1.Conn].query(`insert into ??  SET ? `, [this[index_1.TableName], filterUndefined], function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }
    /**
     *
     * @param val
     * @param options
     */
    async update(val) {
        this[index_1.BF__UPDATE].call(val);
        const key = core_1.ref.get("key", this[index_1.BASEENITY].prototype);
        // @ts-ignore
        const keyVal = val[key]; // 得到索引的 Key 值
        const filterVal = __.omit(val, key); // 得到后面的key值
        return new Promise((resolve, reject) => {
            this[index_1.Conn].query(`update  ??  SET ? where ?? = ?`, [this[index_1.TableName], filterVal, key, keyVal], function (err, res) {
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
            cacheKey = `${this[index_1.TableName]}:getMany:${tojson}`;
            if ((0, lodash_1.isObject)(cache) && !cache.force) {
                let cacheVal = await this[index_1.RedisClient].get(cacheKey);
                if (cacheVal) {
                    return cacheVal;
                }
            }
        }
        return new Promise((resolve, reject) => {
            let _this = this;
            this[index_1.Conn].query(sql, options, function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                    if (isCache) {
                        _this[index_1.Cache](cacheKey, JSON.stringify(res), cache);
                    }
                }
            });
        });
    }
}
exports.AdoOrmBaseEntity = AdoOrmBaseEntity;
//# sourceMappingURL=orm.js.map