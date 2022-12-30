// import { connect } from "net";
// import { Call, RpcClientRemote, RpcClientValue } from ".";
import { ref } from "../ioc";
import { ArcClient } from "./client";

const RpcClientController = (
  base: string,
  remote: {
    interFace: string;
    url: string;
  }
): ClassDecorator => {
  const { interFace, url } = remote;

  let new_url = new URL(url);

  let socket = new ArcClient({
    host: String(new_url.hostname),
    port: Number(new_url.port),
  });

  return function (target: Function) {
    ref.def(target.name, interFace, target.prototype, ":interFace");
    ref.def(target.name, url, target.prototype, ":remoteUrl");
    ref.def(target.name, base, target.prototype, ":base");
    ref.def(target.name, socket, target.prototype, ":socket");
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
