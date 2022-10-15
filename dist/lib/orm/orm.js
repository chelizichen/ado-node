"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdoOrmBaseEnity = exports.GetConn = exports.Target = exports.Conn = exports.BASEENITY = exports.RunConfig = void 0;
const core_1 = require("../core");
const client_1 = require("../error/client");
const dababase_1 = require("../error/dababase");
const oberserver_1 = require("../ober/oberserver");
const protect_1 = require("../oper/protect");
exports.RunConfig = Symbol("RUNCONFIG");
exports.BASEENITY = Symbol("BASEENITY");
exports.Conn = Symbol("CONN");
exports.Target = Symbol("TARGET");
exports.GetConn = Symbol("GETCONN");
class AdoOrmBaseEnity {
    [exports.BASEENITY];
    [exports.Conn];
    [exports.Target];
    constructor() {
        this[exports.Target] = AdoOrmBaseEnity.name;
    }
    async [exports.RunConfig](BaseEnity, dbname) {
        if (this[exports.Target] !== "AdoOrmBaseEnity") {
            console.log("this.target.name", this[exports.Target]);
            console.log("不是AdoOrmBaseEnity 函数调用 拒绝访问");
            return false;
        }
        this[exports.GetConn](dbname);
        this[exports.BASEENITY] = BaseEnity;
        return true;
    }
    async [exports.GetConn](dbname) {
        if (this[exports.Target] !== "AdoOrmBaseEnity") {
            console.log("this.target.name", this[exports.Target]);
            console.log("不是AdoOrmBaseEnity 函数调用 拒绝访问");
            return false;
        }
        let OberInst = core_1.ref.get(core_1.CONSTANT.Observer, oberserver_1.OberServer.prototype);
        const CommonClass = OberInst.get(core_1.CONSTANT.Config)?.value;
        const CacheInst = core_1.ref.get(dbname, CommonClass.prototype);
        this[exports.Conn] = await CacheInst;
        return;
    }
    /**
     * @method getList
     * @description 获取所有的数据
     */
    async getList() {
        return new Promise((resolve, reject) => {
            this[exports.Conn].query(`select * from ${this[exports.BASEENITY].name} limit 0,10`, function (err, res) {
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
        const options = [this[exports.BASEENITY].name, key, val];
        return new Promise((resolve) => {
            this[exports.Conn].query(`select * from ?? where ?? = ?`, options, function (err, res) {
                if (err) {
                    const Error = new dababase_1.DataBaseError("数据库错误,也许配置项是非法的", err);
                    resolve(Error);
                }
                resolve(res);
            });
        });
    }
    /**
     * @method delOneBy
     * @description 单独根据Key 值来删除
     */
    async delOneBy(val) {
        const key = core_1.ref.get("key", this[exports.BASEENITY].prototype);
        const options = [this[exports.BASEENITY].name, key, val];
        return new Promise((resolve, reject) => {
            this[exports.Conn].query(`DELETE FROM ?? WHERE ?? = ?`, options, function (err, res) {
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
            this[exports.Conn].query(countSql + jonitSql, [this[exports.BASEENITY].name], function (err, res) {
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
            this[exports.Conn].query("select * from ?? where " + sql, [this[exports.BASEENITY].name], function (err, res) {
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
        let opt = [this[exports.BASEENITY].name, filterUndefined];
        return new Promise((resolve, reject) => {
            this[exports.Conn].query(`insert into ??  SET ? `, opt, function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }
}
exports.AdoOrmBaseEnity = AdoOrmBaseEnity;
//# sourceMappingURL=orm.js.map