import { Collect, Inject } from "ado-node";
import { GoodsMapper } from "./Goods.Mapper";

@Collect()
export class GoodsService {
  @Inject(GoodsMapper)
  GoodsMapper!: GoodsMapper;

  public async TestAddGoods() {
    for (let i = 0; i < 100; i++) {
      const goods = [`商品${i}`, i, i % 3];
      await this.GoodsMapper.TestAddGoods(goods);
    }
    return "数据添加成功";
  }
  public async List() {
    return await this.GoodsMapper.List();
  }
}
