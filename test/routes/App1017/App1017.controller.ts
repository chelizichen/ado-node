// @ts-nocheck
import {
  HandleController,
  Controller,
  Get,
  UsePipe,
  Post,
} from "../../../lib/core";
import { UseControllerInterceptor } from "../../../lib/interceptor/global";
import { UseInterceptor } from "../../../lib/interceptor/interceptor";
import { Body, Headers, Query, URLParam } from "../../../lib/params/params";
import {
  UserControllerInterceptor,
  UserLogInterceptor,
  UserLogPipe,
} from "./App1017.utils";

@Controller("/app1017")
@UseControllerInterceptor(new UserControllerInterceptor())
class App1017Controller extends HandleController {
  @Get("/list")
  public async getList() {}

  @Get("/a1")
  @UseInterceptor(new UserLogInterceptor())
  @UsePipe(new UserLogPipe())
  public async a1(req: any, _res: any) {
    console.log("thisa1", this);

    return {
      data: req.headers,
    };
  }

  @Get("/a2")
  public async a2() {
    console.log("this.a", this.a);
    return {
      data: "ok",
    };
  }

  @Get("/a3")
  public async a3(@Query() query: any) {
    console.log(query);

    // console.log(query);
    return {
      data: "ok",
    };
  }
  @Post("/a4")
  public async a4(@Body() body: any, @Headers() headers) {
    console.log("headers", headers);

    console.log(body);
    return {
      data: "ok",
    };
  }
}

export { App1017Controller };
