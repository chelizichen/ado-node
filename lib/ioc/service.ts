import { BaseController } from "../types";
import { IRouter } from "express";
import { ref } from "./ref";

// 创建SerivceMap
export const SerivceMap = new Map<string, any>();

/**
 * @methods GenereateRouter
 * @param Controller
 * @returns
 */
export function GenereateRouter(Controller: BaseController): IRouter {
  const URL = ref.get("BaseUrl", Controller.prototype);
  const GetService = new Controller(URL, SerivceMap);
  return GetService.Boost();
}
