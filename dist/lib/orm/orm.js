"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdoNodeOrm = void 0;
const core_1 = require("../core");
const oberserver_1 = require("../ober/oberserver");
class AdoNodeOrm {
    BaseEnity;
    conn;
    constructor(BaseEnity, dbname) {
        this.BaseEnity = BaseEnity;
        this.getConn(dbname);
    }
    getConn(dbname) {
        let OberInst = core_1.ref.get(core_1.CONSTANT.Observer, oberserver_1.OberServer.prototype);
        const CommonClass = OberInst.get(core_1.CONSTANT.Config)?.value;
        const CacheInst = core_1.ref.get(dbname, CommonClass.prototype);
        this.conn = CacheInst;
    }
    /**
     * @method getList
     * @description 获取所有的数据
     */
    async getList() {
        const conn = await this.conn;
        return new Promise((resolve, reject) => {
            conn.query(`select * from ${this.BaseEnity.name} limit 0,10`, function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }
    async getOneBy() { }
    /**
     * @method delOneByKey
     * @description 单独根据Key 值来删除
     */
    async delOneByKey() { }
}
exports.AdoNodeOrm = AdoNodeOrm;
//# sourceMappingURL=orm.js.map