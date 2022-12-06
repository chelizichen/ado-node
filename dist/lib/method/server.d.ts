import { Express } from "express";
import { AdoNodeOptions } from "../types";
declare function defineAdoNodeOptions(options: AdoNodeOptions): AdoNodeOptions;
declare class AdoNodeServer {
    static Controllers: any[];
    static __getProvider__(provider: any[]): void;
    static createControllers(): any[];
    static run(): void;
    static runServer(): void;
    static runSSRServer(callBack: (app: Express) => void): void;
}
export { AdoNodeServer, defineAdoNodeOptions };
