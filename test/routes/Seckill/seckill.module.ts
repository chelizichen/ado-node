import { Module } from "../../../lib/module/module";
import { SeckillController } from "./seckill.controller";

@Module({
  Controller: [SeckillController],
  Provider: [],
})
export class SeckillMoudle {}
