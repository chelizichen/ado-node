import { AdoNodeController } from "ado-node";
import { AppService } from "./App.Service";
export declare class AppController extends AdoNodeController {
    AppService: AppService;
    hello(): {
        data: string;
        code: number;
    };
}
