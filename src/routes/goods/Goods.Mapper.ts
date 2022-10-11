// @ts-nocheck
import { Mapper, Connect, Insert, Select } from "ado-node";
import { CONSTANT } from "../../config/constant";

@Mapper()
@Connect(CONSTANT.MYSQL)
export class GoodsMapper {
  @Insert(`insert into goods(g_name,g_price,g_type) value (?,?,?)`)
  public async TestAddGoods(req) {}

  @Select(`select * from goods`)
  public async List() {}
}
