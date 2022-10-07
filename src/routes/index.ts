import { SeckillController } from "./seckill/seckill.controller";
import { UserController } from "./user/User.Controller";

const options = {
  controller: [UserController, SeckillController],
  base: "/api",
  port: 3000,
  staticDist: "dist/app",
};

export { options };
