import { Mapper, Connect, Select } from "../../../index";
import { UseConfig } from "../../../lib/store/config";
import { commonClass } from "../../config/common";

@Mapper()
@UseConfig(commonClass)
@Connect("mysql")
class App919Mapper {
  @Select("select * from user")
  public getList() {}
}

export { App919Mapper };
