import { App917Module } from "./../App917/App917.module";
import { Module } from "../../../lib/module/module";
import { App106Controller } from "./App106.controller";

@Module({
  Controller: [App106Controller],
  Provider: [App917Module],
})
export class App106Module {}
