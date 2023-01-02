import { RpcClientRemote, RpcClientValue } from "./index"

import { ref } from "../ioc";
import { useArgs } from "../method/method";
import { Request, Response } from 'express'
import { ArcClient } from "./client";
import { nextTick } from "process";

export const RpcClientMap: Record<RpcClientRemote, RpcClientValue[]> = {}


/**
 * @description 每个使用 Call 装饰器的函数都会变成Post路由请求，并且经过 ArcServer 转发
 * @rotuer express 代理的 http 路由地址
 * @method 远程rpc的方法
 */
const Call = (router: string, method: string): MethodDecorator => {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    nextTick(() => {
      let { name, prototype } = target.constructor;
      let fn = descriptor.value.bind(target.constructor.prototype)
      let interFace = ref.get(name, prototype, ":interFace");
      let socket = ref.get(name, prototype, ":socket") as ArcClient;
      let base = ref.get(name, prototype, ":base")


      // Aop 处理
      descriptor.value = async function (req: Request, res: Response) {
        const args = useArgs(propertyKey as string, target, req, res);

        let data = await fn(...args);

        let RemoteCallReq: RpcClientValue['router'] = {
          data,
          method,
          interFace,
        };

        let RpcCallRes = await socket.call(RemoteCallReq)
        res.json(RpcCallRes)
      };

      if (!RpcClientMap[base]) {
        RpcClientMap[base] = []
      }
      RpcClientMap[base].push({ [router]: descriptor.value })

    })


  };
};



/**
 * 
 * @Register 
 * @description 用于注册Rpc方法
 * @default -> [#1]InterFace[#2]Method
 */
const Register = (method: string): MethodDecorator => {
  return function (target: Object, _propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    nextTick(() => {
      const { name, prototype } = target.constructor
      const Events = ref.get(name, prototype, ":events");
      let fn = descriptor.value.bind(target)
      let interFace = ref.get(name, prototype, ":interFace")
      let fn_name = "[#1]" + interFace + "[#2]" + method
      Events[fn_name] = fn
    })
  }
};

export { Call, Register }