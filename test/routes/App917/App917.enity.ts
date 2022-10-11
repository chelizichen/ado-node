import { Enity, Key, Keyword } from "../../../index";

@Enity
export class user {
  @Key
  id!: number;
  phone!: number;
  @Keyword
  username!: string;
  password!: string;
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