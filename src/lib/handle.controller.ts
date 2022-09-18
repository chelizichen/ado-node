import { ref } from "./handle.reflect";

import { GenereateRouter } from "./core";
import SerivceMap from "./handle.service";

export const Controller = (BaseUrl: string): ClassDecorator => {
  return (target: Function) => {
    // Support BaseURL
    ref.def("BaseUrl", BaseUrl, target.prototype);
    // Support Express.Router For Server  -> server.ts
    ref.def(target, GenereateRouter(target.prototype.constructor));
    SerivceMap.clear();
    // console.log(SerivceMap);
  };
};
