import { Module } from "../../../lib/module/module";
import { App106Controller } from "./App106.controller";

@Module({
  Controller: [App106Controller],
  Provider: [],
})
export class App106Module {}
