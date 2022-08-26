import {Body} from "../../lib/types";

export type FishType = {
	eat:Body<{ id: number, weight: number }>
	sell:Body<{ id: number, money: string }>
}
export abstract class FishAbstract{
	abstract eat(req:FishType['eat'],_res?:Response):any
	abstract sell(req:FishType['sell'],_res?:Response):any
}

export class FishDTO{
	id=Number;
	weight=Number;
}