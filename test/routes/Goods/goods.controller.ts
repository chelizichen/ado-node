import {
  AdoNodeController,
  Controller,
  Get,
  Inject,
  Post,
  UsePipe,
} from "../../../lib/core";
import { UseInterceptor } from "../../../lib/interceptor/interceptor";
import { Body, Query } from "../../../lib/params/params";
import { TokenInterceptor } from "../../interceptor/header";
import { Pagination } from "../../interceptor/pagination";
import { GoodsService } from "./goods.service";
import { plainToGoods } from "./goods.pipe";
import { Goods } from "./goods.enity";

@Controller("/goods")
export class GoodsController extends AdoNodeController {
  @Inject(GoodsService)
  GoodsService!: GoodsService;

  @Get("/list")
  @UseInterceptor(new Pagination())
  async list(@Query() query: any) {
    return await this.GoodsService.getList(query.page, query.size);
  }

  @Get("/one")
  async one() {
    return await this.GoodsService.getOne();
  }

  @Get("/del")
  @UseInterceptor(new TokenInterceptor())
  async del(@Query() query: { id: string }) {
    return await this.GoodsService.delOne(query.id);
  }

  @Post("/update")
  @UsePipe(new plainToGoods())
  async update(@Body() body: Goods) {
    const str = body.getNameAndPrice();
    return str;
  }

  @Get("/sql")
  sql() {
    const sql = this.GoodsService.sql();
    return sql;
  }
}
