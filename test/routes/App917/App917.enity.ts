import {
  AdoOrmBaseEnity,
  Enity,
  Key,
  Keyword,
  AutoCreate,
} from "../../../index";

@Enity("mysql")
export class user extends AdoOrmBaseEnity {
  @Key
  @AutoCreate
  id!: number;

  phone!: number;

  @Keyword
  username!: string;

  password!: string;

  @AutoCreate
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
