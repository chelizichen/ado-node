import { RpcClientController, RpcServerController } from "./controller";
import { Call, Register } from "./bind";
import { RpcServerModules, RpcClientModules } from "./run";

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
  }

};


export type RpcInterface = string;
export type RpcServerValue = any;

export { RpcClientController, RpcServerController };
export { Call, Register };

export type { RpcClientRemote, RpcClientValue };

export { RpcServerModules, RpcClientModules };
