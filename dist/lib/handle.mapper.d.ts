import * as mysql from "mysql";
declare const Connect: (coon: mysql.Connection) => ClassDecorator;
declare const Mapper: () => ClassDecorator;
declare const Select: (sql: string) => (target: Object, _propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
declare const Update: (sql: string) => (target: Object, _propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
declare const Delete: (sql: string) => (target: Object, _propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
declare const Insert: (sql: string) => (target: Object, _propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
export { Mapper, Connect, Select, Update, Insert, Delete };