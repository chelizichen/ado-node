import { AdoNodeControllerType } from "../types";
import { IRouter } from "express";
declare const SerivceMap: Map<string, any>;
/**
 * @methods GenereateRouter
 * @param Controller
 * @returns
 */
declare function GenereateRouter(Controller: AdoNodeControllerType): IRouter;
export { SerivceMap, GenereateRouter };
