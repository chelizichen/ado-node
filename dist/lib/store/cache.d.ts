export declare const CreateCache: (cacheName: string) => MethodDecorator;
export declare const UseCache: (cacheName: string, commonClass: Function) => PropertyDecorator;
export declare function getCachekey(type: string, table: string, options: any): string;
