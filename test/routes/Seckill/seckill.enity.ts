import { AdoOrmBaseEntity, Entity, IsNumber, Key } from "../../../lib/core";
import { BeforeInsert, BeforeUpdate } from "../../../lib/orm/monitor";
import { commonClass } from "../../config/common";

@Entity("seckill", commonClass.getMysqlPoolConnection)
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
}