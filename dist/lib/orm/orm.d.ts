import * as mysql from "mysql";
import { ClassConstructor } from "../core";
export declare class AdoOrmBaseEnity {
    BaseEnity: Function;
    conn: mysql.Connection;
    constructor(BaseEnity: ClassConstructor, dbname: string);
    private getConn;
    /**
     * @method getList
     * @description 获取所有的数据
     */
    getList(): Promise<unknown>;
    /**
     * @method getOneBy
     * @description 单独根据Key 来获取数据
     */
    getOneBy(val: any): Promise<unknown>;
    /**
     * @method delOneBy
     * @description 单独根据Key 值来删除
     */
    delOneBy(val: any): Promise<unknown>;
    /**
     * @method countBy // 根据key - value 得到数据库中的数量
     * @param val
     */
    countBy(val: Record<string, string>): Promise<unknown>;
    getBy(val: Record<string, string>): Promise<unknown>;
    save(val: Record<string, string>): Promise<unknown>;
}
