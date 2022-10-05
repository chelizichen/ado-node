import { RedisClientType } from "redis";
import { CommonClass, CONSTANT } from "./constant";
import { ref } from "./handle.reflect";

export const UseCache = (RedisClinet: RedisClientType): PropertyDecorator => {
  return async function (target: Object, propertyKey: string | symbol) {
    ref.def(CONSTANT.Redis, RedisClinet, CommonClass.prototype);
    target.constructor.prototype[propertyKey] = RedisClinet;
    await RedisClinet.connect();
  };
};

export function getCachekey(type: string, table: string, options: any) {
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
  return "";
}
