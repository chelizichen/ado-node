import { FilesController } from "./Files.Controller";
import { Module } from "../../../lib/module/module";

@Module({
  Controller: [FilesController],
  Provider: [],
})
export class FilesMoudle {}
