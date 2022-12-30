import { RpcClientController,Call, Body } from "../../../.."

// 转发
@RpcClientController("/animal",{interFace:"AnimalInterFace",url:"http://127.0.0.1:9000"})
class AnimalRpcController{

    @Call("/hello","hello")
    async sayHello(@Body() body:any){
        const {name,age} = body
        return "hello i am " + name + " age is "+ age
    }

    @Call("/jump","jump")
    async GoodBye(@Body() body:any){
        const {name,age} = body

        return {
            name,
            age,
            action:"jump"
        }
    }
}

export {AnimalRpcController}