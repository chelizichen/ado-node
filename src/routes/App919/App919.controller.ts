// import { Controller, Get, HandleController } from "ado-node";
import { Controller, HandleController, Get } from "ado-node";
@Controller("/App919")
class App919Controller extends HandleController {
  @Get("/a1")
  public async a1() {}
}

export { App919Controller };
