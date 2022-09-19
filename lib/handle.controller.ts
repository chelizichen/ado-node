import { ref } from "./handle.reflect";

import { GenereateRouter } from "./core";
import SerivceMap from "./handle.service";

export const Controller = (BaseUrl: string): ClassDecorator => {
  return (target: Function) => {
    ref.def("BaseUrl", BaseUrl, target.prototype);
    ref.def(target, GenereateRouter(target.prototype.constructor));
    SerivceMap.clear();
  };
};
