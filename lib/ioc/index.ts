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

import { AdoNodeController } from "./class";
import { Controller } from "./controller";
import { Inject, Collect } from "./ioc";

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
import { ref } from "./ref";

import { SerivceMap, GenereateRouter } from "./service";

export { AdoNodeController };
export { Controller };
export { Inject, Collect };
export { ref };
export { SerivceMap, GenereateRouter };


