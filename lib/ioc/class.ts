// type QueryId = {
//   id: string;
// }
// @Controller("/computer")
// class ComputerController extends AdoNodeController{
//   @Get("/list")
//   async getList(){
//     return await {}
//   }

//   @Get("/one")
//   async getOne(@Query() query:QueryId) {
//     return await {}
//   }

//   @Post("/update")
//   async update(@Body() body:Computer){
//     return await {}
//   }
// }

import { BaseController } from "./../../index.d";
import * as express from "express";
import { ref } from "./ref";
import { Request, Response } from "express";
import { AdoNodeControllerInterceptor } from "../interceptor/global";

export const Boost = Symbol("Boost")

class AdoNodeController {
  constructor(
    private readonly Base: string,
    private readonly Service: Map<
      string,
      { method: "Get" | "Post" | "All"; fn: any }
    >
  ) {}
  public [Boost](Base: BaseController): express.IRouter {
    const AdoNodeGlobalInterceptor: AdoNodeControllerInterceptor = ref.get(
      Base.name,
      Base.prototype,
      ":ControllerInterceptor"
    );

    const app: express.IRouter = express.Router();
    this.Service.forEach((service, URL) => {
      let fn = service.fn;

      service.fn = async function (req: Request, res: Response) {
        if (AdoNodeGlobalInterceptor) {
          if (AdoNodeGlobalInterceptor.before) {
            const data = await AdoNodeGlobalInterceptor.before(req);
            if (data) {
              res.json(data);
              return;
            }
          }

          const ret = await fn(req, res);
          if (ret instanceof Error) {
            res.json(ret);
            return;
          }
          // 判断是不是Controller 层返回
          if (ret.data && ret.after) {
            res.json(ret.data);
            // 单独拦截器的结尾操作
            ret.after(req, res);
            return;
          } else if (ret.data && !ret.after) {
            res.json(ret.data);
            return;
          }

          // 单独随便返回个东西
          if (ret) {
            res.json(ret);
            return;
          }

          // 全局拦截器的结尾操作
          if (AdoNodeGlobalInterceptor.after) {
            AdoNodeGlobalInterceptor.after(req);
          }
          return;
        } else {
          const ret = await fn(req, res);
          
          if (ret instanceof Error) {
            res.json(ret);
            return;
          }

          // 判断是不是Controller 层返回
          if (ret.data && ret.after) {
            res.json(ret.data);
            // 单独拦截器的结尾操作
            ret.after(req, res);
            return;
          } else if (ret.data && !ret.after) {
            res.json(ret.data);
            return;
          }

          // 单独随便返回个东西
          if (ret) {
            res.json(ret);
            return;
          }
          return;
        }
      };

      if (service.method == "Get") {
        URL = this.Base + URL;
        app.get(URL, service.fn);
      }
      if (service.method == "Post") {
        URL = this.Base + URL;
        app.post(URL, service.fn);
      }
      if (service.method == "All") {
        app.all(URL, service.fn);
      }
      console.log("url", URL);
    });
    return app;
  }
}

export { AdoNodeController };
