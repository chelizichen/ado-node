import * as mysql from "mysql";
export declare type ClassConstructor = new (...args: any[]) => void;
declare const Curd: (CurdUrl: string, Enity: ClassConstructor, coon: mysql.Connection) => MethodDecorator;
export { Curd };
