import { Collect } from "../../../../lib/ioc";

@Collect()
class AnimalService{
    hello(){
        console.log("hello world");
        return "IOC Service"
    }
}

export {
    AnimalService
}