import { BaseController } from "../types";
import { IRouter } from "express";
declare const SerivceMap: Map<string, any>;
/**
 * @methods GenereateRouter
 * @param Controller
 * @returns
 */
declare function GenereateRouter(Controller: BaseController): IRouter;
export { SerivceMap, GenereateRouter };
