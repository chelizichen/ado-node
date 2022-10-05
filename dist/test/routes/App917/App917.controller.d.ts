import { HandleController } from "../../../lib/handle.class";
import { App917Service } from "./App917.service";
import * as mysql from "mysql";
export declare const coon: mysql.Connection;
declare class App917Controller extends HandleController {
    App917Service: App917Service;
    a1(): Promise<{
        Msg: string;
        Code: number;
        ret: void;
    }>;
    b1(_req: any, _res: any): Promise<{
        Msg: string;
        Code: number;
        ret: void;
    }>;
    c1(_req: any, _res: any): Promise<{
        code: number;
        msg: string;
        data: void;
    }>;
    CurdUser(): Promise<void>;
}
export { App917Controller };
