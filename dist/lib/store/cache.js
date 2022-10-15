"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCache = exports.CreateCache = exports.getCachekey = void 0;
const constant_1 = require("../constant/constant");
const ref_1 = require("../ioc/ref");
const oberserver_1 = require("../ober/oberserver");
const CreateCache = (cacheName) => {
    return function (target, _propertyKey, descriptor) {
        const val = descriptor.value;
        ref_1.ref.def(cacheName, val, target.constructor.prototype);
    };
};
exports.CreateCache = CreateCache;
const UseCache = (cacheName) => {
    return async function (target, propertyKey) {
        let OberInst = ref_1.ref.get(constant_1.CONSTANT.Observer, oberserver_1.OberServer.prototype);
        const CommonClass = OberInst.get(constant_1.CONSTANT.Config)?.value;
        const CacheInst = ref_1.ref.get(cacheName, CommonClass.prototype);
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