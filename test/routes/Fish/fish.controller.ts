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
