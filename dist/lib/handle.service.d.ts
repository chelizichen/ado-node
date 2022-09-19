import { BaseController } from "./types";
import { IRouter } from "express";
declare const SerivceMap: Map<string, any>;
export default SerivceMap;
/**
 * @methods GenereateRouter
 * @param Controller
 * @returns
 */
export declare function GenereateRouter(Controller: BaseController): IRouter;
