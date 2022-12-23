
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
