import { Express } from "express";
import { HandleProxyOptions } from "./types";
declare function createServer(options: HandleProxyOptions, SSRFunc?: (app: Express) => void): void;
declare function createSSRServer(options: HandleProxyOptions): void;
export { createServer, createSSRServer };
