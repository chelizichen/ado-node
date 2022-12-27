"use strict";
/**
 * @author chelizichen
 * @description 对外暴露方法和装饰器
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateView = exports.View = exports.defineAdoNodeConfig = exports.gerRedis = exports.getConnection = exports.save = exports.update = exports.del = exports.query = exports.AdoOrmBaseView = exports.AdoOrmBaseEntity = exports.BeforeUpdate = exports.BeforeDelete = exports.BeforeInsert = exports.Index = exports.AutoCreate = exports.IsNumber = exports.IsOptional = exports.IsEmail = exports.Keyword = exports.Key = exports.Entity = exports.ENTITY_CONSTANT = void 0;
const conn_1 = require("./conn");
Object.defineProperty(exports, "defineAdoNodeConfig", { enumerable: true, get: function () { return conn_1.defineAdoNodeConfig; } });
Object.defineProperty(exports, "gerRedis", { enumerable: true, get: function () { return conn_1.gerRedis; } });
Object.defineProperty(exports, "getConnection", { enumerable: true, get: function () { return conn_1.getConnection; } });
const enity_1 = require("./enity");
Object.defineProperty(exports, "Entity", { enumerable: true, get: function () { return enity_1.Entity; } });
Object.defineProperty(exports, "Key", { enumerable: true, get: function () { return enity_1.Key; } });
Object.defineProperty(exports, "Keyword", { enumerable: true, get: function () { return enity_1.Keyword; } });
Object.defineProperty(exports, "IsEmail", { enumerable: true, get: function () { return enity_1.IsEmail; } });
Object.defineProperty(exports, "IsOptional", { enumerable: true, get: function () { return enity_1.IsOptional; } });
Object.defineProperty(exports, "IsNumber", { enumerable: true, get: function () { return enity_1.IsNumber; } });
Object.defineProperty(exports, "AutoCreate", { enumerable: true, get: function () { return enity_1.AutoCreate; } });
Object.defineProperty(exports, "Index", { enumerable: true, get: function () { return enity_1.Index; } });
const monitor_1 = require("./monitor");
Object.defineProperty(exports, "BeforeInsert", { enumerable: true, get: function () { return monitor_1.BeforeInsert; } });
Object.defineProperty(exports, "BeforeDelete", { enumerable: true, get: function () { return monitor_1.BeforeDelete; } });
Object.defineProperty(exports, "BeforeUpdate", { enumerable: true, get: function () { return monitor_1.BeforeUpdate; } });
const orm_1 = require("./orm");
Object.defineProperty(exports, "AdoOrmBaseEntity", { enumerable: true, get: function () { return orm_1.AdoOrmBaseEntity; } });
Object.defineProperty(exports, "AdoOrmBaseView", { enumerable: true, get: function () { return orm_1.AdoOrmBaseView; } });
const sql_1 = require("./sql");
Object.defineProperty(exports, "query", { enumerable: true, get: function () { return sql_1.query; } });
Object.defineProperty(exports, "update", { enumerable: true, get: function () { return sql_1.update; } });
Object.defineProperty(exports, "del", { enumerable: true, get: function () { return sql_1.del; } });
Object.defineProperty(exports, "save", { enumerable: true, get: function () { return sql_1.save; } });
const view_1 = require("./view");
Object.defineProperty(exports, "View", { enumerable: true, get: function () { return view_1.View; } });
Object.defineProperty(exports, "CreateView", { enumerable: true, get: function () { return view_1.CreateView; } });
var ENTITY_CONSTANT;
(function (ENTITY_CONSTANT) {
    ENTITY_CONSTANT["Key"] = "keys";
    ENTITY_CONSTANT["Keyword"] = "keyword";
    ENTITY_CONSTANT["AutoCreate"] = "AutoCreate";
    ENTITY_CONSTANT["DefaultValue"] = "__default__";
    ENTITY_CONSTANT["IsOptional"] = "__isoptional__";
})(ENTITY_CONSTANT = exports.ENTITY_CONSTANT || (exports.ENTITY_CONSTANT = {}));
//# sourceMappingURL=index.js.map