import { Call, RpcClientController } from "../../lib/rpc";

@RpcClientController("/base1",{'interFace':"TestIntro",'url':"http://127.0.0.1:9000"})
class TestRpcClientController{

    @Call("/hello","sayhello")
    async sayHello(){
        return "hello" + " whatever u do"
    }

    @Call("/goodBye","sayGoodBye")
    async GoodBye(){
        return "good bye , good night"
    }
}

@RpcClientController("/base2",{'interFace':"TestCall",'url':"http://127.0.0.1:9001"})
class TestRpcClientController1{

    @Call("/hello","sayhello")
    async sayHello(){
        return "hello" + " whatever u do"
    }

    @Call("/goodBye","sayGoodBye")
    async GoodBye(){
        return "good bye , good night"
    }
}

export {
    TestRpcClientController,TestRpcClientController1
}