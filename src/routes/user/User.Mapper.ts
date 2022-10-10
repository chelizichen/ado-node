import { Connect, Mapper, Select, UseConfig } from "ado-node";
import { CommonClass } from "../../config/common";
import { CONSTANT } from "../../config/constant";

@Mapper()
@Connect(CONSTANT.MYSQL)
@UseConfig(CommonClass)
export class UserMapper {
  @Select(`select * from  user where id = ?`)
  public async getList(_options: any) {}
}
