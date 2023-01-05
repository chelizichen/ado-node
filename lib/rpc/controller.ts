import { ref } from "../ioc";
import { CreateClientMap } from "./bind";
import { ArcClient } from "./client";

/**
 * @author chelizichen 2022.12.30
 * @param base string http控制器基础路由
 * @param remote 远程地址 
 * @type remote { interface:string;url:string }
 * @description 设置 Rpc 控制器
 */
const RpcClientController = (
  base: string,
  remote: {
    interFace: string;
    url: string;
  }
): ClassDecorator => {
  const { interFace, url } = remote;

  let new_url = new URL(url);

  const clientMap = CreateClientMap();

  let socket = new ArcClient({
    host: String(new_url.hostname),
    port: Number(new_url.port),
  });

  return function (target: Function) {
    const { name, prototype } = target
    
    ref.def(name, interFace, prototype, ":interFace");
    ref.def(name, url, prototype, ":remoteUrl");
    ref.def(name, base, prototype, ":base");
    ref.def(name, socket, prototype, ":socket");
    ref.def(name,clientMap,prototype,":clientMap")
  };
};

const RpcServerController = (interFace: string): ClassDecorator => {
  return function (target: Function) {
    const RegistEvents = {}
    const {name,prototype} = target
    ref.def(name, interFace, prototype, ":interFace");
    ref.def(name,RegistEvents,prototype,":events")
  };
};

export { RpcClientController, RpcServerController };
