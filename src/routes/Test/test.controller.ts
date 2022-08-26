import { HandleController } from "../../lib/handle.class";
import { Controller } from "../../lib/handle.controller";
import { Get } from "../../lib/handle.method";

@Controller("/test")
export class TESTCONTROLLER extends HandleController {
  @Get("/test1")
  public test1() {
    return {
      msg: "test",
      code: "200",
    };
  }
}
