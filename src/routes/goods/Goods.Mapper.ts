// @ts-nocheck
import { Mapper, Connect, Insert, Select, UseConfig } from "ado-node";
import { CommonClass } from "../../config/common";
import { CONSTANT } from "../../config/constant";
import { Goods } from "./Gooods.Enity";

@Mapper()
@Connect(CONSTANT.MYSQL)
@UseConfig(CommonClass)
export class GoodsMapper {
  @Insert(`insert into goods(g_name,g_price,g_type) value (?,?,?)`)
  public async TestAddGoods(req) {}

  @Select(`select * from goods`)
  public async List() {}
}
