import { createServer, UseConfig } from "ado-node";
import { CommonClass } from "./config/common";
import { options } from "./routes";

@UseConfig(CommonClass)
class AdoNodeServer {
  static run(options: any) {
    createServer(options);
  }
}

AdoNodeServer.run(options);
