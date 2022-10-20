import {
  AdoOrmBaseEnity,
  AutoCreate,
  Collect,
  Enity,
  IsEmail,
  Key,
  Keyword,
} from "ado-node";
import { CONSTANT } from "../../config/constant";

@Enity(CONSTANT.MYSQL)
@Collect()
class User extends AdoOrmBaseEnity {
  @Key
  id!: number;

  @IsEmail
  email!: number;

  @Keyword
  username!: string;

  password!: string;

  @AutoCreate
  createTime!: string;
}

export { User };
