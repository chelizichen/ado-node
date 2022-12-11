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
    const key = "getone:seckill:1"
    
    // ADD FORCE UPDATE CACHE OPTIONS 

    const data1 = await this.Seckill.getOneBy("1", {
      cache: true,
      timeout: 1000,
      key
    });
    const data2 = await this.Seckill.countBy(
      {
        sk_price: "10.00",
      },
      {
        cache: true,
        timeout: 1000,
        key:"count:seckill:10"
      }
    );

    return {
      data1,
      data2,
    };
  }

  async testTransaction() {
    const transaction = this.Seckill.createTransaction();

    const seckill = new Seckill();

    seckill.go_id = "10";
    seckill.sk_price = "99.00";
    seckill.sk_status = "1";
    seckill.id = "10";
    // transaction.push(async () => {
    //   const data = await this.Seckill.delOneBy("9") as any
    //   if (data.affectedRows == 0) {
    //     return transaction.TransactionError("删除失败");
    //   } else {
    //     return data
    //   }
    // });

    transaction.push(async () => this.Seckill.update(seckill));

    transaction.push(async () => this.Seckill.getList("0", "10"));

    // transaction.push(async ()=>Promise.reject("测试错误"));

    try {
      await transaction.connection();
      const data = await transaction.start();
      return data;
    } catch (e) {
      return e;
    }
  }
  async testMoitor() {
    const transaction = this.Seckill.createTransaction();
    const seckill = new Seckill();
    
    seckill.go_id = "10";
    seckill.sk_price = "99.00";
    seckill.sk_status = "1";

    const seckill1 = new Seckill()
    seckill1.go_id = "10";
    seckill1.sk_price = "666.00";
    seckill1.sk_status = "1";
    seckill1.id = "10";

    transaction.push(async () => this.Seckill.save(seckill))
    transaction.push(async () => this.Seckill.update(seckill1));

    try {
      await transaction.connection();
      const data = await transaction.start();
      return data;
    } catch (e) {
      return e;
    }
  }

  async testDelMonitor() {
    const data = await this.Seckill.delOneBy("9")
    return data
  }
}
