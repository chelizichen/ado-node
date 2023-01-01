import { RpcServerController,Register } from "../../../..";

/**
 * @description 用于编写 Dog 接口的配置文件
 */
@RpcServerController("DogInterFace")
class DogInterFace {
    

    @Register("woff")
    async woff(message:string):Promise<{message:string}>{
        console.log(message);
        return {
            message
        }
    }

    

    @Register("eat")
    async eat(message:string):Promise<{message:string}>{
        console.log(message);
        return {
            message
        }
    }

    
}



export{
    DogInterFace
}