import { Enity, Key, Keyword } from "../../../lib/handle.enity";

@Enity
export class user {
  @Key
  id!: number;
  phone!: number;
  @Keyword
  username!: string;
  password!: string;
}
