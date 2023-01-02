// import { RpcServerModules } from "ado-node";
import { RpcServerModules } from "ado-node";
import { AnimalInterFace } from "./server/AnimalInterFace.server";
import { DogInterFace } from "./server/DogInterFace.server";



@RpcServerModules({
  host: "127.0.0.1",
  port: 9000,
  RpcServerController: [AnimalInterFace, DogInterFace],
})
// @ts-ignore
class TestRpcServerModules {}
