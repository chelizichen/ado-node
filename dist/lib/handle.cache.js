"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCachekey = exports.UseCache = void 0;
const constant_1 = require("./constant");
const handle_reflect_1 = require("./handle.reflect");
const UseCache = (RedisClinet) => {
    return async function (target, propertyKey) {
        handle_reflect_1.ref.def(constant_1.CONSTANT.Redis, RedisClinet, constant_1.CommonClass.prototype);
        target.constructor.prototype[propertyKey] = RedisClinet;
        await RedisClinet.connect();
    };
};
exports.UseCache = UseCache;
function getCachekey(type, table, options) {
    if (type == "list") {
        if (options.key && options.page && options.size) {
            return `list&table:${table}&key:${options.key}&page:${options.page}&size:${options.size}`;
        }
        if (!options.key && options.page && options.size) {
            return `list&table:${table}&key:null&page:${options.page}&size:${options.size}`;
        }
        if (options.key && !options.page && !options.size) {
            return `list&table:${table}&key:${options.key}&page:1&size:10`;
        }
        if (!options.key && !options.page && !options.size) {
            return `list&table:${table}&key:null&page:1&size:10`;
        }
    }
    if (type == "get") {
        return `get&table:${table}&${options.key}:${options.value}`;
    }
    if (type == "update") {
        return `get&table:${table}&${options.key}:${options.value}`;
    }
    return "";
}
exports.getCachekey = getCachekey;
//# sourceMappingURL=handle.cache.js.map