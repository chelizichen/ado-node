import {
  AdoOrmBaseEnity,
  Enity,
  Key,
  Keyword,
  AutoCreate,
  Collect,
} from "../../../index";
import { IsEmail, IsNumber, IsOptional } from "../../../lib/orm/enity";

@Enity("mysql")
@Collect()
export class User extends AdoOrmBaseEnity {
  @Key
  @AutoCreate
  id!: number;

  @IsNumber
  phone!: number;

  @Keyword
  @IsOptional
  username!: string;

  @IsNumber
  password!: string;

  @IsEmail
  email!: string;

  @AutoCreate
  @IsOptional
  createTime!: string;
}

export class Ret {
  static Message<T>(code: number, msg: string, data: T) {
    return {
      code,
      msg,
      data,
    };
  }
}
