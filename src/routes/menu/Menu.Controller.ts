import { Controller, Get, Post } from "ado-node";

@Controller("/menu")
export class MenuController {
  // 查看角色权限
  @Get("/permission")
  public async getRolePermission() {}

  // 菜单
  @Get("/list")
  public async getMenuList() {}

  // 修改菜单
  @Post("/modify")
  public async modifyMenu() {}
}
