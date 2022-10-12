// import express, { IRouter } from "express";
import * as express from "express";
export class HandleController {
  constructor(
    public readonly Base: string,
    public readonly Service: Map<string, { method: "Get" | "Post"; fn: any }>
  ) {}
  Boost(): express.IRouter {
    const app: express.IRouter = express.Router();
    this.Service.forEach((service, URL) => {
      URL = this.Base + URL;
      console.log("URL", service.method, URL);
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
