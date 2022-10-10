import { Enity, Key, Keyword } from "ado-node";

@Enity
export class Goods {
  @Key
  id!: number;

  @Keyword
  g_name!: string;

  g_price!: string;

  g_type!: string;
}
