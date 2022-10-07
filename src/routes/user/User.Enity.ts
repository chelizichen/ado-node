import { Enity, Key, Keyword } from "ado-node";

@Enity
class User {
  @Key
  id!: number;
  phone!: number;
  @Keyword
  username!: string;
  password!: string;
}

export { User };
