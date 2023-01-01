import { RpcServerModules } from "../../../lib/rpc/run";
import { AnimalInterFace } from "./interface/AnimalInterFace.server";
import { DogInterFace } from "./interface/DogInterFace.server";



@RpcServerModules({
  host: "127.0.0.1",
  port: 9000,
  RpcServerController: [AnimalInterFace, DogInterFace],
})
// @ts-ignore
class TestRpcServerModules {}
