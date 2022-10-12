"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdoOrmBaseEnity = void 0;
const core_1 = require("../core");
const oberserver_1 = require("../ober/oberserver");
class AdoOrmBaseEnity {
    BaseEnity;
    conn;
    async getConn(dbname) {
        let OberInst = core_1.ref.get(core_1.CONSTANT.Observer, oberserver_1.OberServer.prototype);
        const CommonClass = OberInst.get(core_1.CONSTANT.Config)?.value;
        const CacheInst = core_1.ref.get(dbname, CommonClass.prototype);
        this.conn = await CacheInst;
    }
    /**
     * @method getList
     * @description 获取所有的数据
     */
    async getList() {
        return new Promise((resolve, reject) => {
            this.conn.query(`select * from ${this.BaseEnity.name} limit 0,10`, function (err, res) {
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
        const key = core_1.ref.get("key", this.BaseEnity.prototype);
        const options = [val];
        return new Promise((resolve, reject) => {
            this.conn.query(`select * from ${this.BaseEnity.name} where ${key} = ?`, options, function (err, res) {
                if (err) {
                    reject(err);
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
        const key = core_1.ref.get("key", this.BaseEnity.prototype);
        const options = [val];
        return new Promise((resolve, reject) => {
            this.conn.query(`DELETE FROM ${this.BaseEnity.name} WHERE ${key} = ?`, options, function (err, res) {
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
        const tablename = this.BaseEnity.name;
        let countSql = `select count(*) as total from ${tablename} where `;
        let jointSql = "";
        let keys = Object.keys(val);
        keys.forEach((item, index) => {
            if (index != keys.length - 1) {
                jointSql += `${item} = '${val[item]}' and `;
            }
            else {
                jointSql += `${item} = '${val[item]}' `;
            }
        });
        countSql += jointSql;
        return new Promise((resolve, reject) => {
            this.conn.query(countSql, function (err, res) {
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
        const tablename = this.BaseEnity.name;
        let countSql = `select * as total from ${tablename} where `;
        let jointSql = "";
        let keys = Object.keys(val);
        keys.forEach((item, index) => {
            if (index != keys.length - 1) {
                jointSql += `${item} = '${val[item]}' and `;
            }
            else {
                jointSql += `${item} = '${val[item]}' `;
            }
        });
        countSql += jointSql;
        return new Promise((resolve, reject) => {
            this.conn.query(countSql, function (err, res) {
                if (err) {
                    reject(err);
                }
                const data = res[0];
                resolve(data);
            });
        });
    }
    /**
     * @method save
     * @paramsType <T extends Record<string, string>
     */
    async save(val) {
        const filterUndefined = JSON.parse(JSON.stringify(val));
        let opt = [this.BaseEnity.name, filterUndefined];
        return new Promise((resolve, reject) => {
            this.conn.query(`insert into ??  SET ? `, opt, function (err, res) {
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