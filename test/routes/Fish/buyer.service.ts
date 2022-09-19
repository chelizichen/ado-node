import {Collect} from "../../lib/core";

@Collect()
export class BuyerService{
	buy(weight:number,id:number){
		return {
			money:weight*10,
			message:`the fish ${id} can be sell `,
			weight
		}
	}
}