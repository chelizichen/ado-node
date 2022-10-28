import { AdoNodeController } from "ado-node";
import { UserService } from "./User.Service";
export declare class UserController extends AdoNodeController {
    UserService: UserService;
    hello(): {
        data: string;
        code: number;
    };
}
