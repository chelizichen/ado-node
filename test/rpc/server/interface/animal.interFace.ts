import { RpcServerController,Register } from "../../../..";

@RpcServerController("AnimalInterFace")
class AnimalInterFace {
  @Register("hello")
  async sayHello(...args:any[]) {
    console.log(args.toString());
    return "hello world";
  }

  @Register("jump")
  async test1(name:string,age:string,jump:string) {
    
    return "hello world"+"rpc-server "+name+" : "+ age+ " : " + jump ;
  }
}


export{
    AnimalInterFace
}