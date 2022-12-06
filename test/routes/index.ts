import { Module } from "../../lib/module/module";
import { GoodsModule } from "./Goods/goods.module";
import { SqlModule } from './Sql/sql.module';

@Module({
  Provider: [GoodsModule,SqlModule],
  Controller: [],
})
export class AppModule {}
