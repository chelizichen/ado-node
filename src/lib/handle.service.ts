import { BaseController } from "./types";
import { IRouter } from "express";
import { ref } from "../utils/core";

// 创建SerivceMap
const SerivceMap = new Map<string, any>();
export default SerivceMap;

/**
 * @methods GenereateRouter
 * @param Controller
 * @returns
 */
export function GenereateRouter(Controller: BaseController): IRouter {
  const URL = ref.get("BaseUrl", Controller.prototype);
  const GetService = new Controller(URL, SerivceMap);
  // console.log("SerivceMap", SerivceMap);

  return GetService.Boost();
}
