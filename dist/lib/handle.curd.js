"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Curd = void 0;
const handle_service_1 = __importDefault(require("./handle.service"));
const handle_reflect_1 = require("./handle.reflect");
const handle_enity_1 = require("./handle.enity");
const Curd = (CurdUrl, Enity, coon) => {
    return function (_target, _propertyKey, _descriptor) {
        const url = createCurdUrl(CurdUrl);
        function getListRet(req, res) {
            const options = req.query;
            const ListSql = createListSql(Enity, options);
            new Promise((resolve, reject) => {
                coon.query(ListSql, function (err, res) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        const data = {
                            data: res[0],
                            total: res[1][0].total,
                            code: 0,
                            msg: "success",
                        };
                        resolve(data);
                    }
                });
            }).then((ret) => {
                // @ts-ignore
                res.json(ret);
            });
        }
        function getGetRet(req, res) {
            const options = req.query;
            const GetSql = createGetSql(Enity, options);
            new Promise((resolve, reject) => {
                coon.query(GetSql, function (err, res) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        const data = {
                            data: res[0],
                            total: res[1][0].total,
                            code: 0,
                            msg: "success",
                        };
                        resolve(data);
                    }
                });
            }).then((ret) => {
                // @ts-ignore
                res.json(ret);
            });
        }
        function getDelRet(req, res) {
            const options = req.query;
            const DelSql = createDelSql(Enity, options);
            new Promise((resolve, reject) => {
                coon.query(DelSql, function (err, res) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        if (res.affectedRows > 0) {
                            const data = {
                                affect: res.affectedRows,
                                code: 0,
                                msg: "success",
                            };
                            resolve(data);
                        }
                        else {
                            const data = {
                                affect: res.affectedRows,
                                code: -1,
                                msg: "error",
                            };
                            resolve(data);
                        }
                    }
                });
            }).then((ret) => {
                // @ts-ignore
                res.json(ret);
            });
        }
        function getAddRet(req, res) {
            const options = req.body;
            const UpdateSql = createAddSql(Enity, options);
            new Promise((resolve, reject) => {
                coon.query(UpdateSql, function (err, res) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(res);
                    }
                });
            }).then((ret) => {
                // @ts-ignore
                res.json(ret);
            });
        }
        function getUpdateRet(req, res) {
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
            }).then((ret) => {
                // @ts-ignore
                res.json(ret);
            });
        }
        handle_service_1.default.set(url.get.get, {
            fn: getGetRet,
            method: "Get",
        });
        handle_service_1.default.set(url.get.list, {
            fn: getListRet,
            method: "Get",
        });
        handle_service_1.default.set(url.get.del, {
            fn: getDelRet,
            method: "Get",
        });
        handle_service_1.default.set(url.post.modify, {
            fn: getUpdateRet,
            method: "Post",
        });
        handle_service_1.default.set(url.post.add, {
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
    const keyword = handle_reflect_1.ref.get("keyword", Enity.prototype);
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
    const key = handle_reflect_1.ref.get("key", Enity.prototype);
    return `select SQL_CALC_FOUND_ROWS * from ${Enity.name} where ${key} = ${options[key]};SELECT FOUND_ROWS() as total;`;
}
function createDelSql(Enity, options) {
    const key = handle_reflect_1.ref.get("key", Enity.prototype);
    return `DELETE  from ${Enity.name} where ${key} = ${options[key]}`;
}
function createAddSql(Enity, options) {
    let fields = handle_enity_1.EnityTable.get(Enity.name);
    if (!fields) {
        fields = Object.getOwnPropertyNames(new Enity());
        handle_enity_1.EnityTable.set(Enity.name, fields);
    }
    const key = handle_reflect_1.ref.get("key", Enity.prototype);
    const opt = fields.filter((el) => el != key);
    const val = opt.map((el) => {
        return options[el];
    });
    return `insert into ${Enity.name}(${opt.toString()}) values  (${val.toString()})`;
}
function createUpdateSql(Enity, options) {
    let fields = handle_enity_1.EnityTable.get(Enity.name);
    if (!fields) {
        fields = Object.getOwnPropertyNames(new Enity());
        handle_enity_1.EnityTable.set(Enity.name, fields);
    }
    const key = handle_reflect_1.ref.get("key", Enity.prototype);
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
//# sourceMappingURL=handle.curd.js.map