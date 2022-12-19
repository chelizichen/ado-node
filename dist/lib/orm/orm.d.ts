import * as mysql from "mysql";
import { RedisClientType } from "redis";
import { transaction } from "./transaction";
import { BASEENITY, Target, TableName, querybuilder, RunConfig, cacheOptions, Cache, RedisClient, BF__DELETE, BF__INSERT, BF__UPDATE, VoidFunction, GetCache, Conn } from "./symbol";
declare class AdoOrmBaseEntity {
    [BASEENITY]: Function;
    [Conn]: mysql.PoolConnection;
    [Target]: any;
    [TableName]: string;
    [RedisClient]: RedisClientType;
    [BF__DELETE]: Function;
    [BF__INSERT]: Function;
    [BF__UPDATE]: Function;
    [VoidFunction](): void;
    constructor();
    createTransaction(): transaction;
    createQueryBuilder(): querybuilder;
    cache(cacheOptions: cacheOptions, VAL: any): Promise<void>;
    [GetCache](cacheOptions: cacheOptions): Promise<string | undefined>;
    [RunConfig](BaseEnity: Function, dbname: string): Promise<void>;
    [Cache](cacheOptions: cacheOptions, value: any): Promise<void>;
    /**
     * @method getList
     * @description 获取所有的数据
     */
    getList(page: string, size: string): Promise<unknown>;
    /**
     * @method getOneBy
     * @description 单独根据Key 来获取数据
     */
    getOneBy(val: string): Promise<any>;
    getOneBy(val: string, cache: cacheOptions): Promise<any>;
    /**
     * @method delOneBy
     * @description 单独根据Key 值来删除
     */
    delOneBy(val: string): Promise<any>;
    /**
     * @method countBy // 根据key - value 得到数据库中的数量
     * @param val
     */
    countBy(val: Record<string, string>): Promise<any>;
    countBy(val: Record<string, string>, cache: cacheOptions): Promise<any>;
    /**
     * @method getBy
     * @param {} Record<string, string>
     */
    getBy(val: Record<string, string>): Promise<any>;
    getBy(val: Record<string, string>, cache: cacheOptions): Promise<any>;
    /**
     * @method save
     * @paramsType <T extends Record<string, string>
     */
    save<T extends Record<string, string> | Object>(val: T): Promise<any>;
    /**
     *
     * @param val
     * @param options
     */
    update<T extends Record<string, string> | AdoOrmBaseEntity>(val: T): Promise<unknown>;
    getMany(val: string, options?: string[]): Promise<any>;
    getMany(val: string, options: string[]): Promise<any>;
    getMany(val: string, options: string[], cache: cacheOptions): Promise<any>;
}
export { AdoOrmBaseEntity };
