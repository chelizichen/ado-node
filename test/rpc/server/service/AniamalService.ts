import { Collect } from "../../../../lib/ioc";
import { ArcPromise } from "../../../../lib/oper/promise";

@Collect()
class AnimalService{
    hello() {
        return new ArcPromise((resolve:any) => {
            setTimeout(() => {
                resolve("延迟1秒执行")   
            },6000)
        })
    }
}

export {
    AnimalService
}