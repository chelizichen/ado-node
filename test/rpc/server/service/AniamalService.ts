import { Collect } from "../../../../lib/ioc";

@Collect()
class AnimalService{
    hello(time:number) {
        return new Promise((resolve) => {
            setTimeout(() => {
              resolve("延迟1秒执行");
            }, time);
        })
    }
}

export {
    AnimalService
}