import { AdoNodeController, Controller, Inject } from "../../../lib/ioc";
import { Get } from "../../../lib/method";
import { User } from "./test.entity";

@Controller("/test")
export class TestController extends AdoNodeController{
  @Inject(User)
  User!: User
  
  @Get("/a1")
  public a1() {
    const user = new User()
    user.id = "1"
    user.name = {
      first: "1",
      last:"2"
    }
    return user
  }
}