declare const CreateCache: (cacheName: string) => MethodDecorator;
declare const UseCache: (cacheName: string) => PropertyDecorator;
declare function getCachekey(type: string, table: string, options: any): string;
export { getCachekey, CreateCache, UseCache };
