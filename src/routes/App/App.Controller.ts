import { Controller, Get, HandleController, Inject, Pipe } from "ado-node";
import { userIdPipe } from "./App.Pipe";
import { AppService } from "./APP.Service";

@Controller("/app")
class AppController extends HandleController {
  @Inject(AppService)
  AppService!: AppService;

  @Get("/list")
  @Pipe(userIdPipe)
  public async getList() {
    return await this.AppService.userList();
  }

  @Get("/demo")
  public async getDemo() {
    return {
      Msg: "Get Demo Success",
      Code: 0,
    };
  }
}

export { AppController };
