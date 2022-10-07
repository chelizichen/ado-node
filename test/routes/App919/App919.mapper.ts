import { Mapper, Connect, Select } from "../../../index";
import { commonClass } from "../../config/common";

@Mapper()
@Connect("mysql", commonClass)
class App919Mapper {
  @Select("select * from user")
  public getList() {}
}

export { App919Mapper };
