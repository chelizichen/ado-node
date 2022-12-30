import { RpcClientController,Call,Body } from "../../../.."

@RpcClientController("/dog",{'interFace':"DogInterFace",'url':"http://127.0.0.1:9001"})
class DogRpcController{

    @Call("/woff","woff")
    async sayHello(@Body() body:any){
        const {name} = body
        return "the dog " + name + " woff"
    }

    @Call("/swim","swim")
    async GoodBye(){
        return "there is a dog swimming"
    }
}

export {
    DogRpcController
}