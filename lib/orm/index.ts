import { query, update, del, save } from "./sql";

export type querybuilder = {
  query: query;
  save: save;
  del: del;
  update: update;
};

export type cacheOptions = {
  cache: boolean;
  timeout: number;
  force?: boolean;
};


export const RunConfig = Symbol("RUNCONFIG");
export const BASEENITY = Symbol("BASEENITY");
export const Conn = Symbol("CONN");
export const Target = Symbol("TARGET");
export const GetConn = Symbol("GETCONN");
export const TableName = Symbol("TableName");
export const Cache = Symbol("CACHE");
export const RedisClient = Symbol("RedisClient")

export const BF__INSERT = Symbol("bf-insert");
export const BF__DESTORY = Symbol("bf-destory");
export const BF__UPDATE = Symbol("bf-update");
export const AF__INSERT = Symbol("af-insert");
export const AF__DESTORY = Symbol("af-destory");
export const AF__UPDATE = Symbol("af-update");

export const VoidFunction = Symbol("void-function")
