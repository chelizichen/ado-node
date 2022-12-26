"use strict";
/**
 * @author chelizichen
 * @date 2022.12.19
 * @description ORM  根据配置文件进行数据库连接管理
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
exports.defineAdoNodeConfig = exports.gerRedis = exports.Connection = exports.getConnection = void 0;
const mysql = __importStar(require("mysql"));
const redis_1 = require("redis");
function defineAdoNodeConfig(config) {
    return config;
}
exports.defineAdoNodeConfig = defineAdoNodeConfig;
class Connection {
    static connectionPool;
    static async readConfig() {
        const config = process.cwd() + "/ado.config.ts";
        const data = await Promise.resolve().then(() => __importStar(require(config)));
        await Connection.createConnection(data);
    }
    static async createConnection(configInfo) {
        const config = configInfo.default.database;
        Connection.connectionPool = await mysql.createPool({
            host: config.host,
            user: config.username,
            password: config.password,
            database: config.database,
            port: config.port,
            connectionLimit: config.connectionLimit,
        });
    }
    static async getConnection() {
        if (!Connection.connectionPool) {
            await Connection.readConfig();
        }
        return new Promise((resolve, reject) => {
            Connection.connectionPool?.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                }
                resolve(connection);
            });
        });
    }
}
exports.Connection = Connection;
function getConnection() {
    return Connection.connectionPool;
}
exports.getConnection = getConnection;
async function gerRedis() {
    return await (0, redis_1.createClient)();
}
exports.gerRedis = gerRedis;
//# sourceMappingURL=conn.js.map