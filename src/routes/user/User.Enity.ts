import { AdoOrmBaseEnity, Enity, Key, Keyword } from "ado-node";
import { CONSTANT } from "../../config/constant";

@Enity(CONSTANT.MYSQL)
class User extends AdoOrmBaseEnity {
  @Key
  id!: number;
  phone!: number;
  @Keyword
  username!: string;
  password!: string;
}

export { User };
