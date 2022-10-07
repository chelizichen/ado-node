import "reflect-metadata";
declare const ref: {
    /**
     * @description 元数据方法
     * @return Reflect.defineMetadata(key.name, value, key.prototype);
     */
    def: <T extends string | Function>(key: T, value: any, target?: Object) => void;
    /**
     * @params key:string | Function
     * @description 元数据方法
     * @return Reflect.defineMetadata(key.name, key.prototype);
     * @return Reflect.defineMetadata(key, key);
     */
    get: <T_1 extends string | Function>(key: T_1, target?: Object) => any;
};
export { ref };
