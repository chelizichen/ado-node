import { Controller, HandleController, Inject, Get, Pipe } from "ado-node";
import { useIdPipe, userNamePipe } from "./App917.pipe";
import { App917Service } from "./App917.service";

@Controller("/app917")
class App917Controller extends HandleController {
  @Inject(App917Service)
  App917Service!: App917Service;

  @Get("/a1")
  public async a1() {
    const ret = await this.App917Service.a1();
    return {
      Msg: "测试中",
      Code: 0,
      ret,
    };
  }

  @Get("/b1")
  @Pipe([useIdPipe, userNamePipe])
  public async b1(_req: any, _res: any) {
    const ret = await this.App917Service.a1();
    return {
      Msg: "测试中",
      Code: 0,
      ret,
    };
  }

  @Get("/c1")
  @Pipe(useIdPipe)
  public async c1(_req: any, _res: any) {
    const ret = await this.App917Service.a1();
    return {
      Msg: "测试中",
      Code: 0,
      ret,
    };
  }
}

export { App917Controller };
