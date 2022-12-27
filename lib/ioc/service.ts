import { IRouter } from "express";
import { AdoNodeController, Boost } from "./class";
import { ref } from "./ref";

// 创建SerivceMap
const SerivceMap = new Map<string, any>();

/**
 * @methods GenereateRouter
 * @param Controller
 * @returns
 */
function GenereateRouter(Controller: typeof AdoNodeController): IRouter {
  const URL = ref.get("BaseUrl", Controller.prototype);
  const GetService = new Controller(URL, SerivceMap);
  return GetService[Boost](Controller);
}

export { SerivceMap, GenereateRouter };
