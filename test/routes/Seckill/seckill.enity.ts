import { AdoOrmBaseEnity, Entity, IsNumber, Key } from "../../../lib/core";
import { commonClass } from "../../config/common";

@Entity("seckill", commonClass.getMysqlPoolConnection)
export class Seckill extends AdoOrmBaseEnity {
  @Key
  id!: string;

  @IsNumber
  go_id!: string;

  @IsNumber
  sk_price!: string;

  @IsNumber
  sk_status!: string;
}