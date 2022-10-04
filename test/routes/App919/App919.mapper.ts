import { Connect, Mapper, Select } from "../../../lib/handle.mapper";
import { coon } from "../App917/App917.controller";

@Mapper()
@Connect(coon)
class App919Mapper {
  @Select("select * from user")
  public getList() {}
}

export { App919Mapper };
