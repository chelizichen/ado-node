import { AdoOrmBaseEntity } from "./orm";
import * as mysql from 'mysql';
export declare class transaction {
    __that__: AdoOrmBaseEntity;
    conn: mysql.PoolConnection;
    __manager__: (() => Promise<any>)[];
    constructor();
    connection(): Promise<void>;
    start(): Promise<any>;
    TransactionError(msg: string): Promise<never>;
    push(fn: () => Promise<any>): void;
}
