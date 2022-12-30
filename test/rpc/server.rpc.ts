import { Register, RpcServerController } from "../../lib/rpc";
import { RpcServerModules } from "../../lib/rpc/run";

@RpcServerController("TestIntro")
class TestIntroRpcInterFace {
  @Register("sayhello")
  async sayHello() {
    return "hello world";
  }

  @Register("test1")
  async test1() {
    return "hello world";
  }
}

@RpcServerController("TestCall")
class TestCallRpcInterFace {
  @Register("sayCall")
  async sayHello() {
    return "hello call";
  }
}

@RpcServerModules({
  host: "127.0.0.1",
  port: 9000,
  RpcServerController: [TestCallRpcInterFace, TestIntroRpcInterFace],
})
// @ts-ignore
class TestRpcServerModules {}



@RpcServerModules({
  host: "127.0.0.1",
  port: 9001,
  RpcServerController: [TestCallRpcInterFace, TestIntroRpcInterFace],
})
// @ts-ignore
class TestRpcServerModules1  {}
