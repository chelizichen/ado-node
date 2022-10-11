import { ClassConstructor, Enity, Key, Keyword } from "../../../lib/core";
import { AdoNodeOrm } from "../../../lib/orm/orm";

@Enity
export class App106Enity extends AdoNodeOrm {
  constructor(BaseEnity: ClassConstructor, dbname = "mysql") {
    console.log("函数创建" + dbname + BaseEnity.name);

    super(BaseEnity, dbname);
  }
  @Key
  id!: number;

  @Keyword
  name!: string;
}

// App106Enity.
