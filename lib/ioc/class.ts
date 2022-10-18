import { BaseController } from "./../../index.d";
import * as express from "express";
import { ref } from "./ref";
import { Request, Response } from "express";
import { AdoNodeControllerInterceptor } from "../interceptor/global";
class HandleController {
  constructor(
    public readonly Base: string,
    public readonly Service: Map<
      string,
      { method: "Get" | "Post" | "All"; fn: any }
    >
  ) {}
  Boost(Base: BaseController): express.IRouter {
    const AdoNodeGlobalInterceptor: AdoNodeControllerInterceptor = ref.get(
      Base.name,
      Base.prototype,
      ":ControllerInterceptor"
    );

    const app: express.IRouter = express.Router();
    this.Service.forEach((service, URL) => {
      if (service.method == "Get") {
        URL = this.Base + URL;
        let fn = service.fn;
        service.fn = async function (req: Request, res: Response) {
          if (AdoNodeGlobalInterceptor) {
            if (AdoNodeGlobalInterceptor.before) {
              AdoNodeGlobalInterceptor.before(req, res);
            }
            fn(req, res);
            if (AdoNodeGlobalInterceptor.after) {
              AdoNodeGlobalInterceptor.after(req, res);
            }
          } else {
            fn(req, res);
          }
        };
        app.get(URL, service.fn);
      }
      if (service.method == "Post") {
        URL = this.Base + URL;
        let fn = service.fn;
        service.fn = async function (req: Request, res: Response) {
          if (AdoNodeGlobalInterceptor) {
            if (AdoNodeGlobalInterceptor.before) {
              AdoNodeGlobalInterceptor.before(req, res);
            }
            fn(req, res);
            if (AdoNodeGlobalInterceptor.after) {
              AdoNodeGlobalInterceptor.after(req, res);
            }
          } else {
            fn(req, res);
          }
        };
        app.post(URL, service.fn);
      }
      if (service.method == "All") {
        app.all(URL, service.fn);
      }
    });
    return app;
  }
}

export { HandleController };
