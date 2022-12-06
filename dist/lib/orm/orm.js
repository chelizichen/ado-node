"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdoOrmBaseEnity = exports.TableName = exports.GetConn = exports.Target = exports.Conn = exports.BASEENITY = exports.RunConfig = void 0;
// import { AdoBaseConfig } from "../config";
const core_1 = require("../core");
const client_1 = require("../error/client");
const dababase_1 = require("../error/dababase");
const protect_1 = require("../oper/protect");
exports.RunConfig = Symbol("RUNCONFIG");
exports.BASEENITY = Symbol("BASEENITY");
exports.Conn = Symbol("CONN");
exports.Target = Symbol("TARGET");
exports.GetConn = Symbol("GETCONN");
exports.TableName = Symbol("TableName");
class AdoOrmBaseEnity {
    [exports.BASEENITY];
    [exports.Conn];
    [exports.Target];
    [exports.TableName];
    constructor() {
        this[exports.Target] = AdoOrmBaseEnity.name;
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
    /**
     * @method getOneBy
     * @description 单独根据Key 来获取数据
     */
    async getOneBy(val) {
        const key = core_1.ref.get("key", this[exports.BASEENITY].prototype);
        const count = (0, protect_1.getStrCount)(val, ["delete", "drop"]);
        if (count) {
            const Error = new client_1.ClientError("非法参数，可能为恶意sql注入");
            return Error;
        }
        return new Promise((resolve) => {
            this[exports.Conn].query(`select * from ?? where ?? = ?`, [this[exports.TableName], key, val], function (err, res) {
                if (err) {
                    const Error = new dababase_1.DataBaseError("数据库错误,也许配置项是非法的", err);
                    resolve(Error);
                }
                resolve(res);
                // this[Conn]
            });
        });
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
    /**
     * @method countBy // 根据key - value 得到数据库中的数量
     * @param val
     */
    async countBy(val) {
        let countSql = `select count(*) as total from ?? where `;
        const jonitSql = this[exports.Conn].escape(val).replaceAll(",", " and ");
        return new Promise((resolve, reject) => {
            this[exports.Conn].query(countSql + jonitSql, [this[exports.TableName]], function (err, res) {
                if (err) {
                    reject(err);
                }
                const data = res[0];
                resolve(data);
            });
        });
    }
    /**
     * @method getBy
     * @param {} Record<string, string>
     */
    async getBy(val) {
        const sql = this[exports.Conn].escape(val).replaceAll(",", " and ");
        return new Promise((resolve, reject) => {
            this[exports.Conn].query("select * from ?? where " + sql, [this[exports.TableName]], function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
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
    async getMany(sql, options) {
        return new Promise((resolve, reject) => {
            this[exports.Conn].query(sql, options, function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
    }
    async query(sql, options) {
        return new Promise((resolve, reject) => {
            this[exports.Conn].query(sql, options, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
    }
}
exports.AdoOrmBaseEnity = AdoOrmBaseEnity;
//# sourceMappingURL=orm.js.map