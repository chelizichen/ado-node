import { Module } from "../../../lib/module/module";
import { App917Controller } from "./App917.controller";

@Module({
  Controller: [App917Controller],
  Provider: [],
})
export class App917Module {}
