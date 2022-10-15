// import express, { IRouter } from "express";
import * as express from "express";
class HandleController {
  constructor(
    public readonly Base: string,
    public readonly Service: Map<
      string,
      { method: "Get" | "Post" | "All"; fn: any }
    >
  ) {}
  Boost(): express.IRouter {
    const app: express.IRouter = express.Router();
    this.Service.forEach((service, URL) => {
      if (service.method == "Get") {
        URL = this.Base + URL;
        console.log("URL", service.method, URL);
        app.get(URL, service.fn);
      }
      if (service.method == "Post") {
        URL = this.Base + URL;
        console.log("URL", service.method, URL);
        app.post(URL, service.fn);
      }
      if (service.method == "All") {
        console.log("URL", service.method, URL);
        app.all(URL, service.fn);
      }
    });
    return app;
  }
}

export { HandleController };
