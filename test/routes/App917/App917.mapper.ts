import { Mapper, Select, Update, Connect } from "../../../index";
import { UseConfig } from "../../../lib/store/config";
import { commonClass } from "../../config/common";
/**
 * @Mapper 数据库操作层
 * @Connect 数据库链接
 * @Select 用于提示sql
 */

@Mapper()
@UseConfig(commonClass)
@Connect("mysql")
class App917Mapper {
  @Select(`select * from  user where id = ? `)
  public async userList(_options: any) {}

  @Update(``)
  public async update() {}
}

export { App917Mapper };
