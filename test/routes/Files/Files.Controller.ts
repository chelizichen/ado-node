import { FilesService } from "./Files.Service";
// import express, { Express } from "express";
import { Get, Controller, AdoNodeController, Inject } from "../../../lib/core";
import { Query } from "../../../lib/params/params";
@Controller("/files")
export class FilesController extends AdoNodeController {
  @Inject(FilesService)
  FilesService!: FilesService;

  @Get("/list")
  public async getFileList() {
    const data = await this.FilesService.getFilesList();
    return {
      data,
      msg: "ok",
      code: 0,
    };
  }

  @Get("/decompression")
  public async deCompression(@Query() query: any) {
    console.log(query);

    const data = this.FilesService.test();
    return {
      data,
      msg: "ok",
      code: 0,
    };
  }
}
