import { RpcServerController,Register, Inject } from "ado-node";
import { AnimalService } from "../service/AnimalService";

/**
 * @description 用于编写 Animal 接口的配置文件
 */
@RpcServerController("AnimalInterFace")
class AnimalInterFace {
    
    @Inject(AnimalService)
    AnimalService!:AnimalService

    @Register("hello")
    async hello(name:string,age:string,value:string):Promise<{message:string,data:Array<{id:string,goods_name:string,goods_price:string,goods_rest_num:string,seller_id:string,sort_child_id:string,sk_price:string,sk_status:string}>}>{
        let message = name + " " + age + " " + value
        const data = await this.AnimalService.getList() as any
        return {
            message,
            data
        }
        
    }

    

    @Register("jump")
    async jump(type: string, address: string, value: string): Promise<{ message: string }>{
        const message = type + " " + address + " " + value
        return {
            message
        }
    }

    
}



export{
    AnimalInterFace
}