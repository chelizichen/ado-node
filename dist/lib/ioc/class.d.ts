import { BaseController } from "./../../index.d";
import * as express from "express";
export declare const Boost: unique symbol;
declare class AdoNodeController {
    private readonly Base;
    private readonly Service;
    constructor(Base: string, Service: Map<string, {
        method: "Get" | "Post" | "All";
        fn: any;
    }>);
    [Boost](Base: BaseController): express.IRouter;
}
export { AdoNodeController };
