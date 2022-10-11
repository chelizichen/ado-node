import { Mapper, Connect, Select } from "../../../index";
@Mapper()
@Connect("mysql")
class App919Mapper {
  @Select("select * from user")
  public getList() {}
}

export { App919Mapper };
