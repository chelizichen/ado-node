"use strict";
// type QueryId = {
//   id: string;
// }
// @Controller("/computer")
// class ComputerController extends AdoNodeController{
//   @Get("/list")
//   async getList(){
//     return await {}
//   }
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
//   @Get("/one")
//   async getOne(@Query() query:QueryId) {
//     return await {}
//   }
//   @Post("/update")
//   async update(@Body() body:Computer){
//     return await {}
//   }
// }
const ref_1 = require("./ref");
const service_1 = require("./service");
const Controller = (BaseUrl) => {
    return (target) => {
        ref_1.ref.def("BaseUrl", BaseUrl, target.prototype);
        ref_1.ref.def(target, (0, service_1.GenereateRouter)(target.prototype.constructor));
        service_1.SerivceMap.clear();
    };
};
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map