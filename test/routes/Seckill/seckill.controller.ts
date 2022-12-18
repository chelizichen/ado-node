import { AdoNodeController, Controller, Get, Inject } from "../../../index";
import { R } from "../../config";
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
  

  @Get("/testTransaction")
  async TestTransaction(){
    return R.success( await this.SeckillService.testTransaction())
  }

  @Get("/testMoitor")
  async TestMoitor() {
    return R.success(await this.SeckillService.testMoitor())
  }

  @Get("/testdelMonitor")
  async TestDelMonitor() {
    return R.success(await this.SeckillService.testDelMonitor())
  }
}