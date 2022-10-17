import { HandleController, Controller, Get } from "../../../lib/core";
import { Role } from "../../../lib/security/role/role";

@Role("User", ["User"])
@Controller("/App1017")
class App1017Controller extends HandleController {
  @Role("Admin", ["User", "Admin"])
  @Get("/list")
  public async getList() {}
}

export { App1017Controller };
