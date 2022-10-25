import { Express } from "express";
import { HandleProxyOptions } from "../types";
declare function defineAdoNodeOptions(options: HandleProxyOptions): HandleProxyOptions;
declare class AdoNodeServer {
    static run(options: HandleProxyOptions): void;
    static runServer(options: HandleProxyOptions): void;
    static runSSRServer(options: HandleProxyOptions, callBack: (app: Express) => void): void;
}
export { AdoNodeServer, defineAdoNodeOptions };
