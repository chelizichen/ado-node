import { Key } from "../../lib/orm";
import { AdoOrmBaseView } from "../../lib/orm/orm";
import { CreateView, View } from "../../lib/orm/view";
import { Goods } from "../routes/Goods/goods.enity";
import { Seckill } from "../routes/Seckill/seckill.enity";

@View({
    engine: CreateView("test")
        .addEntity([Goods, Seckill])
        .omit(["seckill.go_id", "seckill.id", "goods.sort_type_id"])
        .addOptions("seckill.go_id = goods.id")
        .create(),
})
export class AdoViewTest extends AdoOrmBaseView {
    @Key
    id!: string;
    goods_name!: string;
    goods_price!: string;
    goods_rest_num!: string;
    seller_id!: string;
    sort_child_id!: string;
    sk_price!: string;
}
