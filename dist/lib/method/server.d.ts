import { HandleProxyOptions } from "../types";
declare function defineAdoNodeOptions(options: HandleProxyOptions): HandleProxyOptions;
declare function createSSRServer(options: HandleProxyOptions): void;
declare class AdoNodeServer {
    static run(options: HandleProxyOptions): void;
    static runServer(options: HandleProxyOptions): void;
}
export { createSSRServer, AdoNodeServer, defineAdoNodeOptions };
