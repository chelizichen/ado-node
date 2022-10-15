import { AdoOrmBaseEnity } from "./orm";
export declare enum ENITY_CONSTANT {
    Key = "keys",
    Keyword = "keyword",
    AutoCreate = "AutoCreate",
    DefaultValue = "__default__",
    IsOptional = "__isoptional__"
}
declare const Enity: (dbname: string) => (target: typeof AdoOrmBaseEnity) => void;
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
export { Enity, Key, Keyword, IsEmail, IsOptional, IsNumber, EnityTable, AutoCreate, };
