import { HandleProxyOptions } from "../types";
declare function createServer(options: HandleProxyOptions): void;
declare function createSSRServer(options: HandleProxyOptions): void;
declare class AdoNodeServer {
    static run(options: any): void;
}
export { createServer, createSSRServer, AdoNodeServer };
