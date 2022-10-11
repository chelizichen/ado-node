import { Controller, Get, Post } from "ado-node";

@Controller("/role")
export class RoleController {
  // 查看角色权限
  @Get("/permission")
  public async getRolePermission() {}

  // 菜单
  @Get("/list")
  public async getMenuList() {}

  // 修改角色信息
  @Post("/modify")
  public async modifyMenu() {}
}
