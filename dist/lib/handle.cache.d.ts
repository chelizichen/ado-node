import { RedisClientType } from "redis";
export declare const UseCache: (RedisClinet: RedisClientType) => PropertyDecorator;
export declare function getCachekey(type: string, table: string, options: any): string;
