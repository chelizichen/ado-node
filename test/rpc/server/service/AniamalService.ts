import { Collect } from "../../../../lib/ioc";

@Collect()
class AnimalService{
    hello() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("延迟1秒执行")   
            },6000)
        })
    }
}

export {
    AnimalService
}