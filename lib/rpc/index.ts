import { RpcClientController, RpcServerController } from "./controller";
import { Call, Register, Timeout } from "./bind";
import { RpcServerModules, RpcClientModules, RpcServerBoost } from "./run";
import { ArcEvent } from "./event";
import { ArcClient } from "./client";

/**
 * @RpcClientRemote 
 * @type 远端服务器地址
 */
type RpcClientRemote = string;

/**
 * @RpcClientValue 
 * @type { 
 *  method:string 远端地址
 *  data:string 传入远端的数据
 *  interFace:string 远端接口
 * }
 */
type RpcClientValue = {
  [router: string]: {
    method: string;
    data: any;
    interFace: string;
    timeout: number;
  };
};

// 数据包
export let size = ["a",
  "b", "c", "d",
  "e", "f", "g", "h", "i",
  "j", "k", "l", "m",
  "n", "o", "p", "q", "r", 's',
  't', 'u', "v", "w", "x", "y",
  "z","-","=","/",".",","].map(item => {
    return "#" + item + "#"
  })

// 协议
export let proto = ["1",
  "2", "3", "4", "5",
  "6", "7", "8", "9",
  "#"].map(item => {
    return "[#" + item + "]"
  })

export type RpcInterface = string;
export type RpcServerValue = any;
export type { RpcClientRemote, RpcClientValue };

export { RpcClientController, RpcServerController };
export { RpcServerModules, RpcClientModules, RpcServerBoost };
export {
  ArcEvent
}
export { ArcClient };
export { Call, Register, Timeout };
