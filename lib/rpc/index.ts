import { RpcClientController, RpcServerController } from "./controller";
import { Call, Register } from "./bind";

type RpcClient = {
  [RpcRemote: string]: {
    [RpcInterFace: string]: {
      [Method: string]: {
        data: string | Buffer;
      };
    };
  };
};
type RpcClientRemote = string;
type RpcClientValue = {
  [Method: string]: {
    data: string | Buffer;
  };
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

export type { RpcClient, RpcClientRemote, RpcClientValue };
