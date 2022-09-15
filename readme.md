#  - ADO-Node
## 基于 老牌框架 Express Typescript 装饰器 的后端方案 用于解决管理路由 和 异步任务的问题


### 案例

#### Controller 控制层
```
import { Controller, HandleController, Inject, Post } from "../../lib/core";
import { FishAbstract, FishType } from "./fish.abstract";
import { FishService } from "./fish.service";
import { BuyerService } from "./buyer.service";

@Controller("/fish")
export class FishController extends HandleController implements FishAbstract {
@Inject(FishService)
FishService!: FishService;

@Inject(BuyerService)
BuyerService!: BuyerService;

@Post("/eat")
public eat(req: FishType["eat"], _res?: Response) {
const { id, weight } = req.body;
const ret = this.FishService.eat(weight, id);
if (ret.canEat) {
return ret;
} else {
return this.BuyerService.buy(weight, id);
}
}

@Post("/test")
public sell(_req: FishType["sell"], _res?: Response): any {
return {
msg: "hello",
};
}
}
```


#### Service 层 
 可以用Collect 收集多个 Service 注入进 Controller

````
import {Collect} from "../../lib/core";

@Collect()
export class FishService{
	eat(weight:number,id:number){
		if(weight>20){
			return {
				id,
				weight,
				message:`the ${id} fish can eat`,
				canEat:true
			}
		}else {
			return {
				id,
				weight,
				message:`the ${id} fish can't eat`
			}
		}
	}
}


````

#### Type
对于类型 我们可以使用 @Body 或者 @Query 进行约束
````

export type FishType = {
	eat:Body<{ id: number, weight: number }>
	sell:Body<{ id: number, money: string }>
}
export abstract class FishAbstract{
	abstract eat(req:FishType['eat'],_res?:Response):any
	abstract sell(req:FishType['sell'],_res?:Response):any
}

````

#### Server Options 加载配置
````
export const options: HandleProxyOptions = {
  controller: [FishController],
  base: "/api",
  port: 3000,
};
````


#### Run 
````
import createServer from "./lib/server";
import { options } from "./routes";

createServer(options);

````