import { ClassConstructor, Enity, Key, Keyword } from "../../../index";
import { AdoNodeOrm } from "../../../lib/orm/orm";

@Enity
export class Fund_Star extends AdoNodeOrm {
  constructor(BaseEnity: ClassConstructor, dbname = "mysql") {
    console.log("函数创建" + dbname + BaseEnity.name);

    super(BaseEnity, dbname);
  }
  @Key
  id!: number;
  @Keyword
  fund_name!: string;
}