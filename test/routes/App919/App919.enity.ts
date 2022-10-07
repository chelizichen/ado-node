import { Enity, Key, Keyword } from "../../../index";

@Enity
export class Fund_Star {
  @Key
  id!: number;
  @Keyword
  fund_name!: string;
}
