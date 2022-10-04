import { Enity, Key, Keyword } from "../../../lib/handle.enity";

@Enity
export class Fund_Star {
  @Key
  id!: number;
  @Keyword
  fund_name!: string;
}
