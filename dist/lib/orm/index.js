"use strict";
/**
 * @author chelizichen
 * @description 对外暴露方法和装饰器
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineAdoNodeConfig = exports.gerRedis = exports.getConnection = exports.save = exports.update = exports.del = exports.query = exports.AdoOrmBaseEntity = exports.BeforeUpdate = exports.BeforeDelete = exports.BeforeInsert = exports.AutoCreate = exports.EnityTable = exports.IsNumber = exports.IsOptional = exports.IsEmail = exports.Keyword = exports.Key = exports.Entity = exports.VoidFunction = exports.BF__UPDATE = exports.BF__DELETE = exports.BF__INSERT = exports.RedisClient = exports.Cache = exports.TableName = exports.GetConn = exports.Target = exports.Conn = exports.BASEENITY = exports.RunConfig = exports.GetCache = exports.ENTITY_CONSTANT = void 0;
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
Object.defineProperty(exports, "EnityTable", { enumerable: true, get: function () { return enity_1.EnityTable; } });
Object.defineProperty(exports, "AutoCreate", { enumerable: true, get: function () { return enity_1.AutoCreate; } });
const monitor_1 = require("./monitor");
Object.defineProperty(exports, "BeforeInsert", { enumerable: true, get: function () { return monitor_1.BeforeInsert; } });
Object.defineProperty(exports, "BeforeDelete", { enumerable: true, get: function () { return monitor_1.BeforeDelete; } });
Object.defineProperty(exports, "BeforeUpdate", { enumerable: true, get: function () { return monitor_1.BeforeUpdate; } });
const orm_1 = require("./orm");
Object.defineProperty(exports, "AdoOrmBaseEntity", { enumerable: true, get: function () { return orm_1.AdoOrmBaseEntity; } });
const sql_1 = require("./sql");
Object.defineProperty(exports, "query", { enumerable: true, get: function () { return sql_1.query; } });
Object.defineProperty(exports, "update", { enumerable: true, get: function () { return sql_1.update; } });
Object.defineProperty(exports, "del", { enumerable: true, get: function () { return sql_1.del; } });
Object.defineProperty(exports, "save", { enumerable: true, get: function () { return sql_1.save; } });
var ENTITY_CONSTANT;
(function (ENTITY_CONSTANT) {
    ENTITY_CONSTANT["Key"] = "keys";
    ENTITY_CONSTANT["Keyword"] = "keyword";
    ENTITY_CONSTANT["AutoCreate"] = "AutoCreate";
    ENTITY_CONSTANT["DefaultValue"] = "__default__";
    ENTITY_CONSTANT["IsOptional"] = "__isoptional__";
})(ENTITY_CONSTANT = exports.ENTITY_CONSTANT || (exports.ENTITY_CONSTANT = {}));
exports.GetCache = Symbol("GetCache");
exports.RunConfig = Symbol("RUNCONFIG");
exports.BASEENITY = Symbol("BASEENITY");
exports.Conn = Symbol("CONN");
exports.Target = Symbol("TARGET");
exports.GetConn = Symbol("GETCONN");
exports.TableName = Symbol("TableName");
exports.Cache = Symbol("CACHE");
exports.RedisClient = Symbol("RedisClient");
exports.BF__INSERT = Symbol("bf-insert");
exports.BF__DELETE = Symbol("bf-delete");
exports.BF__UPDATE = Symbol("bf-update");
exports.VoidFunction = Symbol("void-function");
//# sourceMappingURL=index.js.map