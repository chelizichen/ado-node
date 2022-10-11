import { Controller, Get, HandleController, Post, useConfig } from "ado-node";
import { CommonClass } from "../../config/common";
import { Ret } from "../../config/ret";

@Controller("/menu")
export class MenuController extends HandleController {
  // 菜单
  @Get("/list")
  public async getMenuList() {}

  // 修改菜单
  @Post("/modify")
  public async modifyMenu() {}

  @Get("/test")
  public async testMenu() {
    const configInst = useConfig<CommonClass>();
    const db = await configInst.CreateDB();
    console.log(!!db);
    return Ret.Message(0, "ok", "data");
  }
}
