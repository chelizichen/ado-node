import { RpcServerModules } from "../../../lib/rpc/run";
import { AnimalInterFace } from "./interface/animal.interFace";
import { DogInterFace } from "./interface/dog.interFace";



@RpcServerModules({
  host: "127.0.0.1",
  port: 9000,
  RpcServerController: [DogInterFace, AnimalInterFace],
})
// @ts-ignore
class TestRpcServerModules {}



@RpcServerModules({
  host: "127.0.0.1",
  port: 9001,
  RpcServerController: [DogInterFace, AnimalInterFace],
})
// @ts-ignore
class TestRpcServerModules1  {}
