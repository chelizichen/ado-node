import { Module } from "../../lib/module/module";
import { GoodsModule } from "./Goods/goods.module";

@Module({
  Provider: [GoodsModule],
  Controller: [],
})
export class AppModule {}
