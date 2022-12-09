import { Collect, Inject } from "../../../lib/core";
import { Seckill } from "./seckill.enity";

@Collect()
export class SeckillService {
  @Inject(Seckill)
  Seckill!: Seckill;

  getList() {
    const data = this.Seckill.createQueryBuilder()
      .del.setEnity(Seckill.name)
      .and("id", "1")
      .getSql();

    return data;
  }

  async getOne() {
    const data1 = await this.Seckill.getOneBy("1", {
      cache: true,
      timeout: 10,
    });
    const data2 = await this.Seckill.countBy(
      {
        sk_price: "10.00",
      },
      {
        cache: true,
        timeout: 10,
      }
    );
    return {
      data1,
      data2,
    };
  }

  async testTransaction() {
    const transaction = this.Seckill.createTransaction();

    const seckill = new Seckill()
    
    seckill.go_id = "10"
    seckill.sk_price = "20.00"
    seckill.sk_status = "1"

    transaction.push(async ()=>this.Seckill.delOneBy("9"));
    transaction.push(async ()=>this.Seckill.save(seckill));
    // transaction.push(async ()=>Promise.reject("测试错误"));

    try {
      await transaction.connection();
      const data = await transaction.start();
      return data;
    } catch (e) {
      return e;
    }
  }
}
