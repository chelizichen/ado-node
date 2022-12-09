import { AdoOrmBaseEntity, Entity, IsNumber, Key } from "../../../lib/core";
import { commonClass } from "../../config/common";


@Entity("goods", commonClass.getMysqlPoolConnection)
export class Goods extends AdoOrmBaseEntity {
  @Key
  id!: string;

  @IsNumber
  sort_type_id!: number;

  goods_name!: string;

  @IsNumber
  goods_price!: number;

  @IsNumber
  goods_rest_num!: number;

  @IsNumber
  seller_id!: number;

  @IsNumber
  sort_child_id!: number;

  getNameAndPrice() {
    return this.goods_name + this.goods_price;
  }

  // @ToOne()
}