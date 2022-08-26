import { ref } from "../utils/core";
import { GenereateRouter } from "./core";
export const Controller = (BaseUrl: string): ClassDecorator => {
  return (target: Function) => {
    // Support BaseURL
    ref.def("BaseUrl", BaseUrl, target.prototype);
    // Support Express.Router For Server  -> server.ts
    ref.def(target, GenereateRouter(target.prototype.constructor));
  };
};
