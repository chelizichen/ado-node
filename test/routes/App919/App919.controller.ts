import { Controller, Get, HandleController } from "../../../index";
@Controller("/App919")
class App919Controller extends HandleController {
  @Get("/a1")
  public async a1() {}
}

export { App919Controller };
