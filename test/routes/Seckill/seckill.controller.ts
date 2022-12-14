import { AdoNodeController, Body, Controller, Get, Inject, Post, UsePipe } from "../../../index";
import { R } from "../../config";
import { SeckillService } from './seckill.service';
import { Seckill } from './seckill.enity';
import { TestValidatePipe } from './seckill.pipe';

@Controller("/seckill")
export class SeckillController extends AdoNodeController {
  @Inject(SeckillService)
  SeckillService!: SeckillService;

  @Get("/list")
  async getList() {
    const data = await this.SeckillService.getList();
    return data;
  }

  @Get("/one")
  async getOne() {
    return await this.SeckillService.getOne();
  }

  @Get("/testTransaction")
  async TestTransaction() {
    return R.success(await this.SeckillService.testTransaction());
  }

  @Get("/testMoitor")
  async TestMoitor() {
    return R.success(await this.SeckillService.testMoitor());
  }

  @Get("/testdelMonitor")
  async TestDelMonitor() {
    return R.success(await this.SeckillService.testDelMonitor());
  }

  @Post("/testPipe")
  @UsePipe(new TestValidatePipe())
  async TestPipe(@Body() body: Seckill) {
    return R.success(body);
  }


  @Get("/testConn")
  async testConn(){
    const data = await this.SeckillService.testConn()
    return R.success(data)
  }

}