import { AdoOrmBaseEntity } from "./orm";
export declare enum ENTITY_CONSTANT {
    Key = "keys",
    Keyword = "keyword",
    AutoCreate = "AutoCreate",
    DefaultValue = "__default__",
    IsOptional = "__isoptional__"
}
declare const Entity: (dbname: string) => (target: typeof AdoOrmBaseEntity) => void;
declare const Key: PropertyDecorator;
declare const Keyword: PropertyDecorator;
declare const AutoCreate: PropertyDecorator;
declare const IsEmail: PropertyDecorator;
declare const IsNumber: PropertyDecorator;
/**
 * @IsOptional 可选的 如果无参数传入 则使用默认的参数
 */
declare const IsOptional: PropertyDecorator;
declare const EnityTable: Map<any, any>;
export { Entity, Key, Keyword, IsEmail, IsOptional, IsNumber, EnityTable, AutoCreate, };
