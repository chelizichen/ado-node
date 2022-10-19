import {
  AdoOrmBaseEnity,
  AutoCreate,
  Collect,
  Enity,
  Key,
  Keyword,
} from "ado-node";
import { CONSTANT } from "../../config/constant";

@Enity(CONSTANT.MYSQL)
@Collect()
class Fund_Company extends AdoOrmBaseEnity {
  @Key
  @AutoCreate
  id!: string;
  CompanyCode!: string;

  @Keyword
  SearchField!: string;

  SNAME!: string;
}

export { Fund_Company };
