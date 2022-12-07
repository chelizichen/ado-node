import { Collect, Inject } from "../../../lib/core";
import { Seckill } from './seckill.enity';

@Collect()
export class SeckillService{
  @Inject(Seckill)
  Seckill!: Seckill
  
  getList() {
    const data = this.Seckill
      .createQueryBuilder()
      .del
      .setEnity(Seckill.name)
      .and("id", "1")
      .getSql()
    
    return data;
  }

  async getOne() {
    const data1 = await this.Seckill.getOneBy("1", {
      cache: true,
      timeout: 10,
    });
    const data2 = await this.Seckill.countBy({
      sk_price:"10.00"
    }, {
      cache: true,
      timeout:10
    })
    return {
      data1,
      data2
    }
  }
}