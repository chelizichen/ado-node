import { Module } from "../../../lib/module/module";
import { GoodsController } from './goods.controller';

@Module({
  Provider: [],
  Controller: [GoodsController],
})
export class GoodsModule {}