import { Collect, Inject } from "../../../lib/core";
import { Goods } from "./goods.enity";

@Collect()
export class GoodsService {
  @Inject(Goods)
  Goods!: Goods;


  async getOne() {
    const data = await this.Goods.getOneBy("1");
    return data
  }

  async getList(page:string,size:string) {
    const data = await this.Goods.getList(page, size);
    return data;
  }

  async delOne(id:string) {
    const data = await this.Goods.delOneBy(id)
    return data;
  }
}
