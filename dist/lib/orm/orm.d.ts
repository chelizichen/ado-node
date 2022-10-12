import * as mysql from "mysql";
export declare class AdoOrmBaseEnity {
    BaseEnity: Function;
    conn: mysql.Connection;
    getConn(dbname: string): Promise<void>;
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
    /**
     * @method getBy
     * @param {} Record<string, string>
     */
    getBy(val: Record<string, string>): Promise<unknown>;
    /**
     * @method save
     * @paramsType <T extends Record<string, string>
     */
    save<T extends Record<string, string> | Object>(val: T): Promise<unknown>;
}
