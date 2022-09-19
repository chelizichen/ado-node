import * as express from "express";
export declare class HandleController {
    readonly Base: string;
    readonly Service: Map<string, {
        method: "Get" | "Post";
        fn: any;
    }>;
    constructor(Base: string, Service: Map<string, {
        method: "Get" | "Post";
        fn: any;
    }>);
    Boost(): express.IRouter;
}
