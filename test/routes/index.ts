import { FilesMoudle } from "./Files/Files.Module";
import { Module } from "../../lib/module/module";
import { App1017Module } from "./App1017/App1017.module";
import { App106Module } from "./App106/App106.module";
import { App919Module } from "./App919/App917.module";

@Module({
  Provider: [App106Module, App1017Module, App919Module, FilesMoudle],
  Controller: [],
})
export class AppModule {}
