import { Connect, Mapper, Select } from "ado-node";
import { CONSTANT } from "../../config/constant";

@Mapper()
@Connect(CONSTANT.MYSQL)
export class UserMapper {
  @Select(`select * from  user where id = ?`)
  public async getList(_options: any) {}
}
