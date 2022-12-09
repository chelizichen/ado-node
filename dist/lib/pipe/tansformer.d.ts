import { AdoOrmBaseEntity } from "../core";
declare type plain = Record<string, any>;
declare class class_transform {
    static plainToClass<T extends AdoOrmBaseEntity, V extends plain | plain[]>(toClass: new (...args: any[]) => T, plain: V): V extends Array<any> ? T[] : T;
    static __classToPlain__(get: string[], inst: any): plain;
    static classToPlain<T extends AdoOrmBaseEntity[] | AdoOrmBaseEntity>(classInst: T, options?: {
        exclude: boolean;
    }): T extends Array<any> ? plain[] : plain;
}
export { class_transform };
