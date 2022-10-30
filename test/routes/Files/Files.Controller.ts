import { FilesService } from "./Files.Service";
// import express, { Express } from "express";
import {
  Get,
  Controller,
  AdoNodeController,
  Inject,
  Post,
} from "../../../lib/core";
import { Req } from "../../../lib/params/params";
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

  // @Get("/decompression")
  // public async deCompression(@Query() query: any) {
  //   console.log(query);
  //   // await 阻塞响应
  //   const data = await this.FilesService.getFilesList("test");
  //   return {
  //     data,
  //     msg: "ok",
  //     code: 0,
  //   };
  // }

  // 文件改名 sudo mv fileName newFilename
  @Post("/upload")
  public async upload(@Req() req: any) {
    const { originalname, filename } = req.files[0];
    console.log(req.files[0]);

    // console.log(filename);

    const data = await this.FilesService.upload(filename, originalname);
    return {
      data,
      msg: "文件上传成功",
      code: 0,
    };
  }
}
