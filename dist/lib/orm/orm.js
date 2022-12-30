"use strict";
/**
 * @author chelizichen
 * @description ORM 父类
 * @LastUpdate 2022.12.19
 * @Update 2022.12.27 add base class AdoOrmBaseView
 *
 */
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
exports.AdoOrmBaseView = exports.AdoOrmBaseEntity = void 0;
const ioc_1 = require("../ioc");
const client_1 = require("../error/client");
const dababase_1 = require("../error/dababase");
const protect_1 = require("../oper/protect");
const redis_1 = require("redis");
const lodash_1 = require("lodash");
const __ = __importStar(require("lodash"));
const sql_1 = require("./sql");
const transaction_1 = require("./transaction");
const conn_1 = require("./conn");
const symbol_1 = require("./symbol");
function void_fn() { }
class AdoOrmBaseEntity {
    [symbol_1.BASEENITY];
    [symbol_1.Conn];
    [symbol_1.Target];
    [symbol_1.TableName];
    [symbol_1.RedisClient];
    [symbol_1.BF__DELETE];
    [symbol_1.BF__INSERT];
    [symbol_1.BF__UPDATE];
    [symbol_1.VoidFunction]() { }
    constructor() {
        this[symbol_1.Target] = AdoOrmBaseEntity.name;
        this[symbol_1.RedisClient] = (0, redis_1.createClient)();
        this[symbol_1.RedisClient].connect();
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
    cache(cacheOptions, VAL) {
        return this[symbol_1.Cache](cacheOptions, VAL);
    }
    async [symbol_1.GetCache](cacheOptions) {
        const isCache = (0, lodash_1.isObject)(cacheOptions) && cacheOptions.cache;
        if (isCache) {
            let cacheVal = await this[symbol_1.RedisClient].get(cacheOptions.key);
            if (cacheVal) {
                return cacheVal;
            }
        }
        return;
    }
    async [symbol_1.RunConfig](BaseEnity, dbname) {
        try {
            this[symbol_1.Conn] = await conn_1.Connection.getConnection();
        }
        catch (e) {
            throw e;
        }
        this[symbol_1.BASEENITY] = BaseEnity;
        this[symbol_1.TableName] = dbname;
        const bf_destory = ioc_1.ref.get("monitor", this[symbol_1.BASEENITY].prototype, ":before-delete");
        this[symbol_1.BF__DELETE] = bf_destory != undefined ? bf_destory : void_fn;
        const bf_insert = ioc_1.ref.get("monitor", this[symbol_1.BASEENITY].prototype, ":before-insert");
        this[symbol_1.BF__INSERT] = bf_insert != undefined ? bf_insert : void_fn;
        const bf_update = ioc_1.ref.get("monitor", this[symbol_1.BASEENITY].prototype, ":before-update");
        this[symbol_1.BF__UPDATE] = bf_update != undefined ? bf_update : void_fn;
    }
    async [symbol_1.Cache](cacheOptions, value) {
        const { key, timeout, cache } = cacheOptions;
        let tocacheVal = "";
        if (typeof value == "string") {
            tocacheVal = value;
        }
        if (typeof value == "number") {
            tocacheVal = String(value);
        }
        if ((0, lodash_1.isObject)(value)) {
            tocacheVal = JSON.stringify(value);
        }
        if (cache) {
            this[symbol_1.RedisClient].set(key, tocacheVal);
            if (timeout) {
                this[symbol_1.RedisClient].expire(key, timeout);
            }
        }
    }
    /**
     * @method getList
     * @description 获取所有的数据
     */
    async getList(page, size) {
        return new Promise((resolve, reject) => {
            this[symbol_1.Conn].query(" select * from ?? limit ?,? ", [this[symbol_1.TableName], parseInt(page), parseInt(size)], function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }
    async getOneBy(val, cache) {
        {
            if (cache) {
                const data = await this[symbol_1.GetCache](cache);
                if (data) {
                    return data;
                }
            }
            const key = ioc_1.ref.get("key", this[symbol_1.BASEENITY].prototype);
            const count = (0, protect_1.getStrCount)(val, ["delete", "drop"]);
            if (count) {
                return new client_1.ClientError("非法参数,可能为恶意sql注入");
            }
            return new Promise((resolve) => {
                let that = this;
                this[symbol_1.Conn].query(`select * from ?? where ?? = ?`, [this[symbol_1.TableName], key, val], function (err, res) {
                    if (err) {
                        resolve(new dababase_1.DataBaseError("数据库错误,也许配置项是非法的", err));
                    }
                    resolve(res);
                    if (cache) {
                        that[symbol_1.Cache](cache, res);
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
        // 中断操作
        const isbreak = await this[symbol_1.BF__DELETE](val);
        if (isbreak) {
            return isbreak;
        }
        const key = ioc_1.ref.get("key", this[symbol_1.BASEENITY].prototype);
        return new Promise((resolve, reject) => {
            this[symbol_1.Conn].query(`DELETE FROM ?? WHERE ?? = ?`, [this[symbol_1.TableName], key, val], function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }
    async countBy(val, cache) {
        if (cache) {
            const data = await this[symbol_1.GetCache](cache);
            if (data) {
                return data;
            }
        }
        let countSql = `select count(*) as total from ?? where `;
        const jonitSql = this[symbol_1.Conn].escape(val).replaceAll(",", " and ");
        return new Promise((resolve, reject) => {
            let that = this;
            this[symbol_1.Conn].query(countSql + jonitSql, [this[symbol_1.TableName]], function (err, res) {
                if (err) {
                    reject(err);
                }
                const data = res[0];
                resolve(data);
                if (cache) {
                    that[symbol_1.Cache](cache, res);
                }
            });
        });
    }
    async getBy(val, cache) {
        if (cache) {
            const data = await this[symbol_1.GetCache](cache);
            if (data) {
                return data;
            }
        }
        const sql = this[symbol_1.Conn].escape(val).replaceAll(",", " and ");
        return new Promise((resolve, reject) => {
            let that = this;
            this[symbol_1.Conn].query("select * from ?? where " + sql, [this[symbol_1.TableName]], function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
                if (cache) {
                    that[symbol_1.Cache](cache, res);
                }
            });
        });
    }
    /**
     * @method save
     * @paramsType <T extends Record<string, string>
     */
    async save(val) {
        const fval = JSON.parse(JSON.stringify(val)); // filter undefined value
        const isbreak = await this[symbol_1.BF__INSERT].call(val);
        if (isbreak) {
            return isbreak;
        }
        return new Promise((resolve, reject) => {
            this[symbol_1.Conn].query(`insert into ??  SET ? `, [this[symbol_1.TableName], fval], function (err, res) {
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
        this[symbol_1.BF__UPDATE].call(val);
        const key = ioc_1.ref.get("key", this[symbol_1.BASEENITY].prototype);
        // @ts-ignore
        const keyVal = val[key]; // 得到索引的 Key 值
        const filterVal = __.omit(val, key); // 得到后面的key值
        return new Promise((resolve, reject) => {
            this[symbol_1.Conn].query(`update  ??  SET ? where ?? = ?`, [this[symbol_1.TableName], filterVal, key, keyVal], function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }
    async getMany(sql, options, cache) {
        if (cache) {
            const data = await this[symbol_1.GetCache](cache);
            if (data) {
                return data;
            }
        }
        return new Promise((resolve, reject) => {
            let that = this;
            this[symbol_1.Conn].query(sql, options, function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                    if (cache) {
                        that[symbol_1.Cache](cache, res);
                    }
                }
            });
        });
    }
}
exports.AdoOrmBaseEntity = AdoOrmBaseEntity;
class AdoOrmBaseView {
    ViewFields;
    ViewName;
    [symbol_1.RedisClient];
    [symbol_1.BASEENITY];
    [symbol_1.Conn];
    constructor() {
        this.ViewFields = [];
        this.ViewName = "";
        this[symbol_1.RedisClient] = (0, redis_1.createClient)();
        this[symbol_1.RedisClient].connect();
    }
    async [symbol_1.RunConfig](Entity) {
        const inst = ioc_1.ref.get(Entity.name, Entity.prototype);
        this.ViewName = ioc_1.ref.get(":view_name", Entity.prototype);
        this.ViewFields = Object.keys(inst);
        this[symbol_1.BASEENITY] = Entity;
        try {
            this[symbol_1.Conn] = await conn_1.Connection.getConnection();
        }
        catch (e) {
            throw e;
        }
    }
    async [symbol_1.Cache](cacheOptions, value) {
        const { key, timeout, cache } = cacheOptions;
        let tocacheVal = "";
        if (typeof value == "string") {
            tocacheVal = value;
        }
        if (typeof value == "number") {
            tocacheVal = String(value);
        }
        if ((0, lodash_1.isObject)(value)) {
            tocacheVal = JSON.stringify(value);
        }
        if (cache) {
            this[symbol_1.RedisClient].set(key, tocacheVal);
            if (timeout) {
                this[symbol_1.RedisClient].expire(key, timeout);
            }
        }
    }
    async [symbol_1.GetCache](cacheOptions) {
        const isCache = (0, lodash_1.isObject)(cacheOptions) && cacheOptions.cache;
        if (isCache) {
            let cacheVal = await this[symbol_1.RedisClient].get(cacheOptions.key);
            if (cacheVal) {
                return cacheVal;
            }
        }
        return;
    }
    async getList(page, size) {
        return new Promise((resolve, reject) => {
            this[symbol_1.Conn].query(" select * from ?? limit ?,? ", [this.ViewName, parseInt(page), parseInt(size)], function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }
    async getOneBy(val, cache) {
        {
            if (cache) {
                const data = await this[symbol_1.GetCache](cache);
                if (data) {
                    return data;
                }
            }
            const index = ioc_1.ref.get("index", this[symbol_1.BASEENITY].prototype);
            const count = (0, protect_1.getStrCount)(val, ["delete", "drop"]);
            if (count) {
                return new client_1.ClientError("非法参数,可能为恶意sql注入");
            }
            return new Promise((resolve) => {
                let that = this;
                this[symbol_1.Conn].query(`select * from ?? where ?? = ?`, [this.ViewName, index, val], function (err, res) {
                    if (err) {
                        resolve(new dababase_1.DataBaseError("数据库错误,也许配置项是非法的", err));
                    }
                    resolve(res);
                    if (cache) {
                        that[symbol_1.Cache](cache, res);
                    }
                });
            });
        }
    }
    async countBy(val, cache) {
        if (cache) {
            const data = await this[symbol_1.GetCache](cache);
            if (data) {
                return data;
            }
        }
        let countSql = `select count(*) as total from ?? where `;
        const jonitSql = this[symbol_1.Conn].escape(val).replaceAll(",", " and ");
        return new Promise((resolve, reject) => {
            let that = this;
            this[symbol_1.Conn].query(countSql + jonitSql, [this.ViewName], function (err, res) {
                if (err) {
                    reject(err);
                }
                const data = res[0];
                resolve(data);
                if (cache) {
                    that[symbol_1.Cache](cache, res);
                }
            });
        });
    }
    async getBy(val, cache) {
        if (cache) {
            const data = await this[symbol_1.GetCache](cache);
            if (data) {
                return data;
            }
        }
        const sql = this[symbol_1.Conn].escape(val).replaceAll(",", " and ");
        return new Promise((resolve, reject) => {
            let that = this;
            this[symbol_1.Conn].query("select * from ?? where " + sql, [this.ViewName], function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
                if (cache) {
                    that[symbol_1.Cache](cache, res);
                }
            });
        });
    }
    async getMany(sql, options, cache) {
        if (cache) {
            const data = await this[symbol_1.GetCache](cache);
            if (data) {
                return data;
            }
        }
        return new Promise((resolve, reject) => {
            let that = this;
            this[symbol_1.Conn].query(sql, options, function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                    if (cache) {
                        that[symbol_1.Cache](cache, res);
                    }
                }
            });
        });
    }
}
exports.AdoOrmBaseView = AdoOrmBaseView;
//# sourceMappingURL=orm.js.map