/**
 * @author chelizichen
 * @description 暴露实体类所需要的装饰器
 */
import { AdoOrmBaseEntity } from "./orm";
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
