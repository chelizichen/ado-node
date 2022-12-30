import { Register, RpcServerController } from "../../../..";

@RpcServerController("DogInterFace")
class DogInterFace {
  @Register("woff")
  async woff() {
    return "hello world";
  }

  @Register("swim")
  async swim() {
    return "hello world";
  }
}

export {
    DogInterFace
}