import { Module } from '../../..';
import { viewTestController } from './viewTest.controller'

@Module({
  Controller:[viewTestController],
  Provider:[]
})
export class viewTestModule{}