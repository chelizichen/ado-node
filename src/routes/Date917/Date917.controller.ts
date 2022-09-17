import { HandleController } from "../../lib/handle.class";
import { Controller } from "../../lib/handle.controller";
import { Inject } from "../../lib/handle.inject";
import { Get } from "../../lib/handle.method";
import { Date917Service } from "./Date917.service";

@Controller("/date917")
class Date917Controller extends HandleController {
  @Inject(Date917Service)
  Date917Service!: Date917Service;

  @Get("/a1")
  public async a1() {
    const ret = await this.Date917Service.a1();
    return {
      Msg: "测试中",
      Code: 0,
      ret,
    };
  }
}

export { Date917Controller };
