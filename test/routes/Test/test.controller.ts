import { AdoNodeController, Controller, Inject } from "../../../lib/ioc";
import { Get } from "../../../lib/method";
import { getConnection } from "../../../lib/orm";
import { OtherTableMenu, User } from "./test.entity";

@Controller("/test")
export class TestController extends AdoNodeController {
  @Inject(User)
  User!: User;

  @Inject(OtherTableMenu)
    OtherTableMenu!:OtherTableMenu

  @Get("/a1")
  public a1() {
    const user = new User();
    user.id = "1";
    user.name = {
      first: "1",
      last: "2",
    };
    return user;
  }

  @Get("/b1")
  public async b1() {
    const conn = await getConnection("lmr_medical")
    const user = new User();
    user.id = "1";
    user.name = {
      first: "1",
      last: "2",
    };
    const data = await new Promise((resolve, reject) => {
      conn.query("select * from menu", function (err, res) {
        if (err) {
          reject(err)
        }
        resolve(res)
      });
    })

    const data1 = await this.OtherTableMenu.getList("0","100")

    return {data,data1};
  }
}