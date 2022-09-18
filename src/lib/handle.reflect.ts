import "reflect-metadata";

const ref = {
  /**
   * @description 元数据方法
   * @return Reflect.defineMetadata(key.name, value, key.prototype);
   */
  def: function <T extends Function | string>(
    key: T,
    value: any,
    target?: Object
  ) {
    if (key instanceof Function) {
      Reflect.defineMetadata(key.name, value, key.prototype);
    } else {
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
  get: function <T extends Function | string>(key: T, target?: Object) {
    if (typeof key == "string") {
      if (target) {
        return Reflect.getMetadata(key, target);
      } else {
        return Reflect.getMetadata(key, key);
      }
    } else {
      return Reflect.getMetadata(key.name, key.prototype);
    }
  },
};

export { ref };
