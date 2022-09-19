import { HandleController } from "../../lib/handle.class";
import { Controller } from "../../lib/handle.controller";
import { Inject } from "../../lib/handle.inject";
import { Get } from "../../lib/handle.method";
import { Pipe } from "../../lib/handle.pipe";
import { useIdPipe, userNamePipe } from "./Date917.pipe";
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

  @Get("/b1")
  @Pipe([useIdPipe, userNamePipe])
  public async b1(_req: any, _res: any) {
    const ret = await this.Date917Service.a1();
    return {
      Msg: "测试中",
      Code: 0,
      ret,
    };
  }

  @Get("/c1")
  @Pipe(useIdPipe)
  public async c1(_req: any, _res: any) {
    const ret = await this.Date917Service.a1();
    return {
      Msg: "测试中",
      Code: 0,
      ret,
    };
  }
}

export { Date917Controller };
