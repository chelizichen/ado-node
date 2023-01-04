"use strict";
/**
 * type QueryId = {
 *   id: string;
 * }
 * @Controller("/computer")
 * class ComputerController extends AdoNodeController{
 *   @Get("/list")
 *   async getList(){
 *     return await {}
 *  *
 *   @Get("/one")
 *   async getOne(@Query() query:QueryId) {
 *     return await {}
 *  *
 *   @Post("/update")
 *   async update(@Body() body:Computer){
 *     return await {}
 *   }
 *
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenereateRouter = exports.SerivceMap = exports.ref = exports.Collect = exports.Inject = exports.Controller = exports.AdoNodeController = void 0;
const class_1 = require("./class");
Object.defineProperty(exports, "AdoNodeController", { enumerable: true, get: function () { return class_1.AdoNodeController; } });
const controller_1 = require("./controller");
Object.defineProperty(exports, "Controller", { enumerable: true, get: function () { return controller_1.Controller; } });
const ioc_1 = require("./ioc");
Object.defineProperty(exports, "Inject", { enumerable: true, get: function () { return ioc_1.Inject; } });
Object.defineProperty(exports, "Collect", { enumerable: true, get: function () { return ioc_1.Collect; } });
/**
 * @Controller("/user")
 * class UserController extends AdoNodeController{
 *      @Inject(UserService)
 *      UserService!: UserService;
 * }
 * @Collect()
 * class UserService{
 *
 * }
 */
const ref_1 = require("./ref");
Object.defineProperty(exports, "ref", { enumerable: true, get: function () { return ref_1.ref; } });
const service_1 = require("./service");
Object.defineProperty(exports, "SerivceMap", { enumerable: true, get: function () { return service_1.SerivceMap; } });
Object.defineProperty(exports, "GenereateRouter", { enumerable: true, get: function () { return service_1.GenereateRouter; } });
//# sourceMappingURL=index.js.map