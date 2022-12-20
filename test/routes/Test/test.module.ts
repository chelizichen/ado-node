import { Module } from "../../../lib/module";
import { TestController } from './test.controller';

@Module({
  Controller: [TestController],
  Provider: [],
})
export class TestModule {}