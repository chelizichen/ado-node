import { BaseController } from "../types";
import { IRouter } from "express";
export declare const SerivceMap: Map<string, any>;
/**
 * @methods GenereateRouter
 * @param Controller
 * @returns
 */
export declare function GenereateRouter(Controller: BaseController): IRouter;
