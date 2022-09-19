"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ref = void 0;
require("reflect-metadata");
const ref = {
    /**
     * @description 元数据方法
     * @return Reflect.defineMetadata(key.name, value, key.prototype);
     */
    def: function (key, value, target) {
        if (key instanceof Function) {
            Reflect.defineMetadata(key.name, value, key.prototype);
        }
        else {
            if (target) {
                Reflect.defineMetadata(key, value, target);
            }
        }
    },
    /**
     * @params key:string | Function
     * @description 元数据方法
     * @return Reflect.defineMetadata(key.name, key.prototype);
     * @return Reflect.defineMetadata(key, key);
     */
    get: function (key, target) {
        if (typeof key == "string") {
            if (target) {
                return Reflect.getMetadata(key, target);
            }
            else {
                return Reflect.getMetadata(key, key);
            }
        }
        else {
            return Reflect.getMetadata(key.name, key.prototype);
        }
    },
};
exports.ref = ref;
//# sourceMappingURL=handle.reflect.js.map