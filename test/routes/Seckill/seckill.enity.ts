import { AdoOrmBaseEntity, Entity, IsNumber, Key } from "../../../index";
import { BeforeDelete, BeforeInsert, BeforeUpdate } from "../../../lib/orm/monitor";

@Entity("seckill")
export class Seckill extends AdoOrmBaseEntity {
  @Key
  id!: string;

  @IsNumber
  go_id!: string;

  @IsNumber
  sk_price!: string;

  @IsNumber
  sk_status!: string; 

  @BeforeInsert
  TestBeforeInsert() {
    console.log("插入前钩子");
    console.log("价格为", this.sk_price, this.go_id);
  }

  @BeforeUpdate
  TestBeforeUpdate() {
    console.log("更新前钩子");
    console.log("价格为", this.sk_price, this.go_id);
  }

  @BeforeDelete
  async  TestDelete(id: string) {
    console.log('id', id);
    return new Promise((resolve) => {
      console.log("删除监听器 触发!!");
      if (id == "9") {
        resolve("id" + " " + id + " 不能被删除");
      } else {
        resolve(undefined)
      }
    });
  }

  
}