import { Enity, Key, Keyword } from "../../../index";
import { AdoOrmBaseEnity } from "../../../lib/orm/orm";

@Enity("mysql")
export class Fund_Star extends AdoOrmBaseEnity {
  @Key
  id!: number;
  @Keyword
  fund_name!: string;
}
