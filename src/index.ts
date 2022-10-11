import { createServer, AdoNodeConfig } from "ado-node";
import { CommonClass } from "./config/common";
import { options } from "./routes";

@AdoNodeConfig(CommonClass)
class AdoNodeServer {
  static run(options: any) {
    createServer(options);
  }
}

AdoNodeServer.run(options);
