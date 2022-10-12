import { AdoNodeConfig, AdoNodeServer } from "ado-node";
import { CommonClass } from "./config/common";
import { options } from "./routes";

@AdoNodeConfig(CommonClass)
class AdoNodeServerImpl extends AdoNodeServer {}

AdoNodeServerImpl.run(options);
