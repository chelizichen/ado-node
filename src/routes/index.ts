import { SeckillController } from "./seckill/Seckill.Controller";
import { UserController } from "./user/User.Controller";

const options = {
  controller: [UserController, SeckillController],
  base: "/api",
  port: 3000,
  staticDist: "dist/app",
};

export { options };
