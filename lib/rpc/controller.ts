import { RpcClientRemote, RpcClientValue } from ".";
import { ref } from "../ioc";




const RpcClientController = (
  interFace: string,
  remoteUrl: string
): ClassDecorator => {
  return function (target: Function) {
    ref.def(target.name, interFace, target.prototype, ":interFace");
    ref.def(target.name, remoteUrl, target.prototype, ":remoteUrl");
  };
};


const RpcServerController = (interFace: string): ClassDecorator => {
  return function (target: Function) {
    ref.def(target.name, interFace, target.prototype, ":interFace");
  };
};

export { RpcClientController, RpcServerController };

