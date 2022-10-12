import { AdoOrmBaseEnity, Enity, Key, Keyword } from "ado-node";
import { CONSTANT } from "../../config/constant";

@Enity(CONSTANT.MYSQL)
export class Role extends AdoOrmBaseEnity {
  @Key
  id!: number; // 角色 id

  @Keyword
  r_name!: string; // 角色名

  r_permission!: string; // 角色权限 // 根据权限获取菜单

  r_level!: string; // 角色等级
}
