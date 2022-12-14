
import { ref } from "./ref";

import { GenereateRouter, SerivceMap } from "./service";

const Controller = (BaseUrl: string): ClassDecorator => {
  return (target: Function) => {
    ref.def("BaseUrl", BaseUrl, target.prototype);
    ref.def(target, GenereateRouter(target.prototype.constructor));
    SerivceMap.clear();
  };
};

export { Controller };
