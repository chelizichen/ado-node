import { RpcClientController,Call, Body } from "../../../.."


@RpcClientController("/animal",{interFace:"AnimalInterFace",url:"http://127.0.0.1:9000"})
class animalController{
    
    @Call("/hello","hello")
    async hello(@Body() body:{name:string,age:string,value:string}):Promise<{name:string,age:string,value:string}>{
        const {name,age,value} = body
        return {
            name,
            age,
            value
        }

    }
    
    @Call("/jump","jump")
    async jump(@Body() body:{type:string,address:string,value:string}):Promise<{type:string,address:string,value:string}>{
        const {type,address,value} = body
        return {
            type,
            address,
            value
        }
    }
    
}

export {
    animalController
}