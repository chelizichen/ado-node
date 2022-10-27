import { AdoNodeConfig } from "../lib/core";
import { AdoNodeServer } from "../lib/method/server";
import { commonClass } from "./config/common";
import { options } from "./routes";

@AdoNodeConfig(commonClass)
export class AdoNodeServerImpl extends AdoNodeServer {}

AdoNodeServerImpl.run(options);

// @AdoNodeConfig(commonClass)
// export class AdoNodeServerImpl1 extends AdoNodeServer {}
// AdoNodeServerImpl.run(options1);
