import { Enity, Key, Keyword } from "../../../lib/core";
import { AdoOrmBaseEnity } from "../../../lib/orm/orm";

@Enity("mysql")
export class Goods extends AdoOrmBaseEnity {
  @Key
  id!: number;

  @Keyword
  name!: string;
}

// App106Enity.
