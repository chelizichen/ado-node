import { AdoNodeController, Controller, Get, Inject } from "../../../lib/core";
import { SeckillService } from './seckill.service';

@Controller("/seckill")
export class SeckillController extends AdoNodeController {
  @Inject(SeckillService)
  SeckillService!: SeckillService;

  @Get("/list")
  async getList() {
    const data = await this.SeckillService.getList()
    return data;
  }

  @Get("/one")
  async getOne() {
    return await this.SeckillService.getOne()
  }
  
}