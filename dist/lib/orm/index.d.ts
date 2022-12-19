import { defineAdoNodeConfig, gerRedis, getConnection } from "./conn";
import { Entity, Key, Keyword, IsEmail, IsOptional, IsNumber, EnityTable, AutoCreate } from "./enity";
import { BeforeInsert, BeforeDelete, BeforeUpdate } from "./monitor";
import { AdoOrmBaseEntity } from "./orm";
import { query, update, del, save } from "./sql";
export declare enum ENTITY_CONSTANT {
    Key = "keys",
    Keyword = "keyword",
    AutoCreate = "AutoCreate",
    DefaultValue = "__default__",
    IsOptional = "__isoptional__"
}
export declare type querybuilder = {
    query: query;
    save: save;
    del: del;
    update: update;
};
export declare type cacheOptions = {
    cache: boolean;
    timeout?: number;
    key: string;
};
export declare const GetCache: unique symbol;
export declare const RunConfig: unique symbol;
export declare const BASEENITY: unique symbol;
export declare const Conn: unique symbol;
export declare const Target: unique symbol;
export declare const GetConn: unique symbol;
export declare const TableName: unique symbol;
export declare const Cache: unique symbol;
export declare const RedisClient: unique symbol;
export declare const BF__INSERT: unique symbol;
export declare const BF__DELETE: unique symbol;
export declare const BF__UPDATE: unique symbol;
export declare const VoidFunction: unique symbol;
export { Entity, Key, Keyword, IsEmail, IsOptional, IsNumber, EnityTable, AutoCreate, };
export { BeforeInsert, BeforeDelete, BeforeUpdate };
export { AdoOrmBaseEntity };
export { query, del, update, save };
export { getConnection, gerRedis, defineAdoNodeConfig };
