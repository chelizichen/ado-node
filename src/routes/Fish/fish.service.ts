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

// @Collect()
// export class TestService extends FishService{
// 	hello(){
// 		return 'hello world'
// 	}
// }

// @Collect(FishService)
// export class TestService{
// 	hello(){
// 		return 'hello world'
// 	}
// }

// const test = new TestService()
// test.hello()