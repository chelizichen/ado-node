import * as express from "express";
declare class HandleController {
    readonly Base: string;
    readonly Service: Map<string, {
        method: "Get" | "Post" | "All";
        fn: any;
    }>;
    constructor(Base: string, Service: Map<string, {
        method: "Get" | "Post" | "All";
        fn: any;
    }>);
    Boost(): express.IRouter;
}
export { HandleController };
