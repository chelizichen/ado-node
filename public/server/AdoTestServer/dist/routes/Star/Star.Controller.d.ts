import { AdoNodeController } from "ado-node";
import { StarService } from "./Star.Service";
export declare class StarController extends AdoNodeController {
    StarService: StarService;
    hello(): {
        data: string;
        code: number;
    };
}
