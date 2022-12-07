import { Module } from "../../../lib/module/module";
import { GoodsController } from './goods.controller';
import { SeckillMoudle } from '../Seckill/seckill.module';

@Module({
  Provider: [SeckillMoudle],
  Controller: [GoodsController],
})
export class GoodsModule {}