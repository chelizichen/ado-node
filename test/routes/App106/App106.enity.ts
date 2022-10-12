import { Enity, Key, Keyword } from "../../../lib/core";
import { AdoOrmBaseEnity } from "../../../lib/orm/orm";

@Enity("mysql")
export class Goods extends AdoOrmBaseEnity {
  @Key
  id!: number;

  @Keyword
  g_name!: string;

  g_price!: string;

  g_type!: string;
}

// App106Enity.
