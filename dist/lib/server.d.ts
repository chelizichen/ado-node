import { HandleProxyOptions } from "./types";
declare function createServer(options: HandleProxyOptions): void;
declare function createSSRServer(options: HandleProxyOptions): void;
export { createServer, createSSRServer };
