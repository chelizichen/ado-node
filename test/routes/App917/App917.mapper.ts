import { Connect, Mapper, Select, Update } from "../../../lib/handle.mapper";
import { commonClass } from "../../config/common";
/**
 * @Mapper 数据库操作层
 * @Connect 数据库链接
 * @Select 用于提示sql
 */

@Mapper()
@Connect("mysql", commonClass)
class App917Mapper {
  @Select(`select * from  user where id = ? `)
  public async userList(_options: any) {}

  @Update(``)
  public async update() {}
}

export { App917Mapper };
