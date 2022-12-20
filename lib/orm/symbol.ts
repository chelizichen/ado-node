/**
 * @author chelizichen
 * @description 利用Symbol 提供私有属性
 */
import { query, save, del, update } from "./sql";

export type querybuilder = {
  query: query;
  save: save;
  del: del;
  update: update;
};

export type cacheOptions = {
  cache: boolean;
  timeout?: number;
  key: string;
};

export const GetCache = Symbol("GetCache");
export const RunConfig = Symbol("RUNCONFIG");
export const BASEENITY = Symbol("BASEENITY");
export const Conn = Symbol("CONN");
export const Target = Symbol("TARGET");
export const GetConn = Symbol("GETCONN");
export const TableName = Symbol("TableName");
export const Cache = Symbol("CACHE");
export const RedisClient = Symbol("RedisClient");
export const BF__INSERT = Symbol("bf-insert");
export const BF__DELETE = Symbol("bf-delete");
export const BF__UPDATE = Symbol("bf-update");
export const VoidFunction = Symbol("void-function");


export enum ENTITY_CONSTANT {
  Key = "keys",
  Keyword = "keyword",
  AutoCreate = "AutoCreate",
  DefaultValue = "__default__",
  IsOptional = "__isoptional__",
}