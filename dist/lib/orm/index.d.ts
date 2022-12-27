/**
 * @author chelizichen
 * @description 对外暴露方法和装饰器
 */
import { defineAdoNodeConfig, gerRedis, getConnection } from "./conn";
import { Entity, Key, Keyword, IsEmail, IsOptional, IsNumber, AutoCreate, Index } from "./enity";
import { BeforeInsert, BeforeDelete, BeforeUpdate } from "./monitor";
import { AdoOrmBaseEntity, AdoOrmBaseView } from "./orm";
import { query, update, del, save } from "./sql";
import { View, CreateView } from "./view";
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
export { Entity, Key, Keyword, IsEmail, IsOptional, IsNumber, AutoCreate, Index };
export { BeforeInsert, BeforeDelete, BeforeUpdate };
export { AdoOrmBaseEntity, AdoOrmBaseView };
export { query, del, update, save };
export { getConnection, gerRedis, defineAdoNodeConfig };
export { View, CreateView };
