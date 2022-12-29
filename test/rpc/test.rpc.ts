import { Call, RpcClientController } from "../../lib/rpc";

@RpcClientController("/rpc",{'interFace':"TestCall",'url':"http://127.0.0.1:9000"})
class TestRpcClientController{

    @Call("/test","/sayhello")
    async sayHello(){
        return "hello" + " whatever u do"
    }

    @Call("/test","/sayGoodBye")
    async GoodBye(){
        return "good bye , good night"
    }
}

export {
    TestRpcClientController
}