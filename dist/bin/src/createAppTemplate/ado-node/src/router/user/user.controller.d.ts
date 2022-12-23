import { AdoNodeController } from "ado-node";
import { UserService } from "./user.service";
export declare class UserController extends AdoNodeController {
    UserService: UserService;
    hello(): any;
}
