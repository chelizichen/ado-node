import { AdoNodeInterceptor } from "../interceptor/interceptor";
export declare function useRunTimeInterceptor(Interceptor: AdoNodeInterceptor, time: keyof AdoNodeInterceptor, options: {
    req: any;
}): Promise<any> | undefined;
declare const Get: (URL: string) => MethodDecorator;
declare const Post: (URL: string) => MethodDecorator;
export { Get, Post };
