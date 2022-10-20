import { defineAdoNodeOptions } from "ado-node";
import { FundCompanyController } from "./company/Company.controller";
import { SeckillController } from "./seckill/Seckill.Controller";
import { UserController } from "./user/User.Controller";

const options = defineAdoNodeOptions({
  controller: [UserController, SeckillController, FundCompanyController],
  base: "/api",
  port: 3001,
  staticDist: "dist/app",
  globalPipes: [],
  cluster: false,
});

export { options };
