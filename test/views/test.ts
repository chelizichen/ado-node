import { Inject } from "../../lib/ioc";
import { Index } from "../../lib/orm/enity";
import { AdoOrmBaseView } from "../../lib/orm/orm";
import { CreateView, View } from "../../lib/orm/view";
import { Goods } from "../routes/Goods/goods.enity";
import { Seckill } from "../routes/Seckill/seckill.enity";

@View({
    engine: CreateView("test")
        .addEntity([Goods, Seckill])
        .omit(["seckill.go_id", "seckill.id"])
        .addOptions("seckill.go_id = goods.id")
        .create(),
    migration:true
})
export class AdoViewTest extends AdoOrmBaseView {
    @Index
    id!: string;

    @Inject(Goods)
    Goods!: Goods
    
    @Inject(Seckill)
    Seckill!: Seckill
}

