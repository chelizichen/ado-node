import { RpcClientController, RpcServerController } from "./controller";
import { Call, Register } from "./bind";

// type RpcClient = {
//   [RpcRemote: string]: {
//     [RpcInterFace: string]: {
//       [Method: string]: {
//         data: string | Buffer;
//       };
//     };
//   };
// };

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

export { RpcClientController, RpcServerController };
export { Call, Register };

// @RpcClientController("test", "localhost:6001")
// class TestAdoRpcController {
//   @Call("hello")
//   async hello() {
//     return "hello";
//   }
// }

export type { RpcClientRemote, RpcClientValue };
