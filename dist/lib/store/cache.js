"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCachekey = exports.UseCache = exports.CreateCache = void 0;
const ref_1 = require("../ioc/ref");
const CreateCache = (cacheName) => {
    return function (target, _propertyKey, descriptor) {
        const val = descriptor.value;
        ref_1.ref.def(cacheName, val, target.constructor.prototype);
    };
};
exports.CreateCache = CreateCache;
const UseCache = (cacheName, commonClass) => {
    return async function (target, propertyKey) {
        const CacheInst = ref_1.ref.get(cacheName, commonClass.prototype);
        target.constructor.prototype[propertyKey] = CacheInst;
        CacheInst().then((res) => {
            target.constructor.prototype[propertyKey] = res;
        });
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
//# sourceMappingURL=cache.js.map