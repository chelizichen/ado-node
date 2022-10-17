import { HandleController, Controller, Get, UsePipe } from "../../../lib/core";
import { UseInterceptor } from "../../../lib/interceptor/interceptor";
import { UserLogInterceptor, UserLogPipe } from "./App1017.utils";

@Controller("/app1017")
class App1017Controller extends HandleController {
  @Get("/list")
  public async getList() {}

  @Get("/a1")
  @UseInterceptor(new UserLogInterceptor())
  @UsePipe(new UserLogPipe())
  public async a1(req: any, _res: any) {
    return req.query;
  }
}

export { App1017Controller };
