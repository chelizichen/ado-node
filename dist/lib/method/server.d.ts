import { Express } from "express";
import { AdoNodeOptions } from "../../index.d";
declare function defineAdoNodeOptions(options: AdoNodeOptions): AdoNodeOptions;
declare class AdoNodeServer {
    static Controllers: any[];
    static __getProvider__(provider: any[]): void;
    static createControllers(): any[];
    static run(): void;
    static runServer(): void;
    static runSSRServer(callBack: (app: Express) => void): Promise<void>;
}
export { AdoNodeServer, defineAdoNodeOptions };
