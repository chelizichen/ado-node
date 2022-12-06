import { Module } from "../../../lib/module/module";
import { SqlController } from './sql.controller';

@Module({
  'Controller': [SqlController],
  'Provider':[]
})
export class SqlModule{}