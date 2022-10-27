import { Module } from "../../../lib/module/module";
import { App919Controller } from "./App919.controller";

@Module({
  Controller: [App919Controller],
  Provider: [],
})
export class App919Module {}
