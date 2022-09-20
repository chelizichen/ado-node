import { Mapper, Connect, Select } from "ado-node";
import { coon } from "../App917/App917.mapper";

@Mapper()
@Connect(coon)
class App919Mapper {
  @Select("select * from user")
  public getList() {}
}

export { App919Mapper };
