import { RpcClientRemote, RpcClientValue } from "./index"
import { ref } from "../ioc";

const RpcClientMap = new Map<RpcClientRemote, RpcClientValue[]>();

const Call = (method: string): MethodDecorator => {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    let { name, prototype } = target.constructor;

    let fn = descriptor.value;
    let remoteUrl = ref.get(name, prototype, ":remoteUrl");
    let interFace = ref.get(name, prototype, ":interFace");

    // Aop 处理
    descriptor.value = async function (...args: any[]) {
      let data = await fn(args);

      let RemoteCallReq: RpcClientValue = {
        method: {
          data,
        },
      };
    };
  };
};
const Register = (method: string): MethodDecorator => {
  return function(){}
};

export {Call,Register}