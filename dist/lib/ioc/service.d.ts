import { IRouter } from "express";
import { AdoNodeController } from "./class";
declare const SerivceMap: Map<string, any>;
/**
 * @methods GenereateRouter
 * @param Controller
 * @returns
 */
declare function GenereateRouter(Controller: typeof AdoNodeController): IRouter;
export { SerivceMap, GenereateRouter };
