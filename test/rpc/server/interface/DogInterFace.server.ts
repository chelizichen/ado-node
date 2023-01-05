import { RpcServerController, Register, Inject } from "../../../..";
import { AnimalService } from "../service/AniamalService";

/**
 * @description 用于编写 Dog 接口的配置文件
 */
@RpcServerController("DogInterFace")
class DogInterFace {

    @Inject(AnimalService)
    AnimalService!: AnimalService

    @Register("woff")
    async woff(message: string): Promise<{ message: string }> {
        console.log(message);
        try {
            const data = await this.AnimalService.hello(100);
            console.log("data", data);
        } catch (e) {
            console.log(e);
        }
        return {
            message
        }
    }



    @Register("eat")
    async eat(message: string): Promise<{ message: string }> {
        console.log(message);
        try {
            const data = await this.AnimalService.hello(100);
            console.log("data", data);
        } catch (e) {
            console.log(e);
        }
        return {
            message
        }
    }


}



export {
    DogInterFace
}