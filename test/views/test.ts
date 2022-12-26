import { CreateView, View } from "../../lib/orm/view";
import { Goods } from "../routes/Goods/goods.enity";
import { Seckill } from "../routes/Seckill/seckill.enity";

@View({
    engine:CreateView("test")
    .addEntity([Goods,Seckill])
    .omit(["seckill.go_id","seckill.id","goods.sort_type_id"])
    .addOptions("seckill.go_id = goods.id")
    .create()
})
export class Test{

}
