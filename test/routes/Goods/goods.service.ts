import { Collect, Inject, query } from "../../../lib/core";
import { Goods } from "./goods.enity";

@Collect()
export class GoodsService {
  @Inject(Goods)
  Goods!: Goods;

  async getOne() {
    const data = await this.Goods.getOneBy("1");
    return data;
  }

  async getList(page: string, size: string) {
    const data = await this.Goods.getList(page, size);
    return data;
  }

  async delOne(id: string) {
    const data = await this.Goods.delOneBy(id);
    return data;
  }

  async sql() {
    const sql = new query()
      .setEnity(["goods", "seckill"])
      .and({
        "seckill.go_id": "goods.id",
        "seckill.sk_status": "0",
      })
      .pagination(0, 10)
      .getSql();

    const sql1 = new query()
      .setEnity(["goods", "seckill"])
      .getSql();

    const sql2 = new query()
      .setEnity("goods")
      .like_and({ goods_name: "?" })
      .pagination(0, 10)
      .getSql();

    const opt2 = ["%名称2%"];

    const sql3 = new query()
      .setEnity("goods")
      .and("goods_rest_num", "20")
      .or("sort_child_id", "4")
      .pagination(0, 10)
      .getSql();

    const data = await this.Goods.getMany(sql);
    const data1 = await this.Goods.getMany(sql1);

    const data2 = await this.Goods.getMany(sql2, opt2);

    const data3 = await this.Goods.getMany(sql3);

    return {
      sql,
      sql1,
      sql2,
      sql3,
      data,
      data1,
      data2,
      data3
    };
  }
}
