import express, { IRouter } from "express";
export class HandleController {
  constructor(
    public readonly Base: string,
    public readonly Service: Map<string, { method: "Get" | "Post"; fn: any }>
  ) {}
  Boost(): IRouter {
    const app: IRouter = express.Router();
    this.Service.forEach((service, URL) => {
      URL = this.Base + URL;
      if (service.method == "Get") {
        app.get(URL, service.fn);
      }
      if (service.method == "Post") {
        app.post(URL, service.fn);
      }
    });
    return app;
  }
}
