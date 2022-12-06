import { BaseController } from "./../../index.d";
import * as express from "express";
declare class AdoNodeController {
    readonly Base: string;
    readonly Service: Map<string, {
        method: "Get" | "Post" | "All";
        fn: any;
    }>;
    constructor(Base: string, Service: Map<string, {
        method: "Get" | "Post" | "All";
        fn: any;
    }>);
    Boost(Base: BaseController): express.IRouter;
}
export { AdoNodeController };
