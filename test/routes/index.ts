import { Module } from "../../lib/module/module";
import { GoodsModule } from "./Goods/goods.module";
import { SqlModule } from './Sql/sql.module';
import { TestModule } from "./Test/test.module";

@Module({
  Provider: [GoodsModule, SqlModule, TestModule],
  Controller: [],
})
export class AppModule {}
