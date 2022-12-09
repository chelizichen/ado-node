"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transaction = void 0;
const _1 = require(".");
class transaction {
    __that__;
    conn;
    __manager__;
    constructor() {
        this.__manager__ = [];
    }
    async connection() {
        this.conn = await this.__that__[_1.Conn];
    }
    async start() {
        return new Promise((resolve, reject) => {
            this.conn.beginTransaction((err) => {
                if (err) {
                    reject(err);
                }
                Promise.all(this.__manager__.map(async (el) => await el()))
                    .then((res) => {
                    console.log("res", res);
                    this.conn.commit((err) => {
                        if (err) {
                            console.log("事物提交失败");
                            reject(err);
                        }
                    });
                    resolve(res);
                    this.conn.release();
                })
                    .catch((err) => {
                    console.log("err", err);
                    this.conn.rollback(() => {
                        console.log("数据操作回滚");
                    });
                    reject(err);
                });
            });
        });
    }
    async TransactionError(msg) {
        return Promise.reject(msg);
    }
    push(fn) {
        this.__manager__.push(fn);
    }
}
exports.transaction = transaction;
//# sourceMappingURL=transaction.js.map