import { HandleController } from "../../../lib/handle.class";
import { Controller } from "../../../lib/handle.controller";
import { Curd } from "../../../lib/handle.curd";
import { Inject } from "../../../lib/handle.inject";
import { Get } from "../../../lib/handle.method";
import { Pipe } from "../../../lib/handle.pipe";
import { user } from "./App917.enity";
import { useIdPipe, userNamePipe } from "./App917.pipe";
import { App917Service } from "./App917.service";
import * as mysql from "mysql";

const config = {
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "boot", //所用数据库
  port: "3306",
};
export const coon = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  multipleStatements: true,
});

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

  @Curd("/user", user, coon)
  public async CurdUser() {}
}

export { App917Controller };
