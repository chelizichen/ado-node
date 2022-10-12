import { AdoOrmBaseEnity, Enity, Key, Keyword } from "ado-node";
import { CONSTANT } from "../../config/constant";

@Enity(CONSTANT.MYSQL)
export class Goods extends AdoOrmBaseEnity {
  @Key
  id!: number;

  @Keyword
  g_name!: string;

  g_price!: string;

  g_type!: string;
}
