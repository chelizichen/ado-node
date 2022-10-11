import * as mysql from "mysql";
export declare class AdoNodeOrm {
    BaseEnity: any;
    conn: mysql.Connection;
    constructor(BaseEnity: any, dbname: string);
    private getConn;
    /**
     * @method getList
     * @description 获取所有的数据
     */
    getList(): Promise<unknown>;
    getOneBy(): Promise<void>;
    /**
     * @method delOneByKey
     * @description 单独根据Key 值来删除
     */
    delOneByKey(): Promise<void>;
}
