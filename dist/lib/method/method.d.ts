import { Request, Response } from "express";
import { AdoNodeInterceptor } from "../interceptor/interceptor";
export declare function useRunTimeInterceptor(Interceptor: AdoNodeInterceptor, time: keyof AdoNodeInterceptor, options: {
    req: any;
}): any;
export declare function useArgs(propertyKey: string, target: Object, req: Request, res: Response): any[];
declare const Get: (URL: string) => MethodDecorator;
declare const Post: (URL: string) => MethodDecorator;
declare const All: (URL: string) => MethodDecorator;
export { Get, Post, All };
