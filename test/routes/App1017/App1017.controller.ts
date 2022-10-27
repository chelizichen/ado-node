import { App919Service } from "./../App919/App919.service";
import {
  AdoNodeController,
  Controller,
  Get,
  UsePipe,
  Post,
  Inject,
} from "../../../lib/core";
import { UseControllerInterceptor } from "../../../lib/interceptor/global";
import { UseInterceptor } from "../../../lib/interceptor/interceptor";
import { Body, Headers, Query, Req } from "../../../lib/params/params";
import { class_transform } from "../../../lib/pipe/tansformer";
import { User } from "../App917/App917.enity";
import {
  UserControllerInterceptor,
  UserInfoPlainPipe,
  UserLogInterceptor,
  UserLogPipe,
} from "./App1017.utils";

@Controller("/app1017")
@UseControllerInterceptor(new UserControllerInterceptor())
class App1017Controller extends AdoNodeController {
  @Inject(App919Service)
  APp919Service!: App919Service;
  @Get("/list")
  public async getList() {}

  @Get("/a1")
  @UseInterceptor(new UserLogInterceptor())
  @UsePipe(new UserLogPipe())
  public async a1(req: any, _res: any) {
    const num = await this.APp919Service.getCompanyList();
    console.log(num);

    return {
      data: req.headers,
    };
  }

  @Get("/a2")
  public async a2() {
    return {
      data: "ok",
    };
  }

  @Get("/a3")
  public async a3(@Req() req: any, @Query() query: any) {
    console.log("req", !!req);
    console.log("query", query);

    // console.log(query);
    return {
      data: "ok",
      userName: "lee",
      password: "leemulus21",
    };
  }
  @Post("/a4")
  public async a4(
    @Req() req: Request,
    @Body() body: any,
    @Headers() headers: any
  ) {
    console.log("headers", headers);
    console.log("req", !!req);

    console.log(body);
    return {
      data: "ok",
    };
  }

  @Post("/a5")
  @UsePipe(new UserInfoPlainPipe())
  public async a5(@Body() user: User) {
    let data = class_transform.classToPlain(user);
    return {
      data,
      user,
      msg: "ok",
    };
  }
}

export { App1017Controller };
