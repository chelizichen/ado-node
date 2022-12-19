import { query, save, del, update } from "./sql";
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
