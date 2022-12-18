/**
 * @Author chelizichen
 * @methods GenereateRouter 
 * @description 生成 Express 路由
 * @param AdoNodeControllerType -- extends AdoNodeController
 */

import { AdoNodeControllerType } from "../types";
import { IRouter } from "express";
import { ref } from "./ref";

// 创建SerivceMap
const SerivceMap = new Map<string, any>();

function GenereateRouter(Controller: AdoNodeControllerType): IRouter {
  const URL = ref.get("BaseUrl", Controller.prototype);
  const GetService = new Controller(URL, SerivceMap);
  return GetService.Boost(Controller);
}

export { SerivceMap, GenereateRouter };
