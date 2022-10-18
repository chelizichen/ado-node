import { AdoNodeInterceptor } from "../interceptor/interceptor";
export declare function useRunTimeInterceptor(Interceptor: AdoNodeInterceptor, time: keyof AdoNodeInterceptor, options: {
    req: any;
    res: any;
}): void;
declare const Get: (URL: string) => MethodDecorator;
declare const Post: (URL: string) => MethodDecorator;
export { Get, Post };
