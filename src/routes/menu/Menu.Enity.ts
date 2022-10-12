import { AdoOrmBaseEnity, Enity, Key, Keyword } from "ado-node";
import { CONSTANT } from "../../config/constant";

@Enity(CONSTANT.MYSQL)
export class Menu extends AdoOrmBaseEnity {
  @Key
  id!: number; // 主键

  @Keyword
  m_name!: string; // 菜单名

  m_permission!: string; // 菜单所需要的权限

  m_level!: string; // 菜单等级

  m_show!: string; // 菜单是否展示
}
