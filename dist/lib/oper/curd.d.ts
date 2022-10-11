export declare type ClassConstructor = new (...args: any[]) => void;
declare const Curd: (CurdUrl: string, Enity: ClassConstructor, store: string[]) => MethodDecorator;
export { Curd };
