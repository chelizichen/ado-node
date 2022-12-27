import { Controller,Inject,AdoNodeController,Get } from '../../..';
import { viewTestService } from './viewTest.service';

@Controller("/viewTest")
export class viewTestController extends AdoNodeController{
  @Inject(viewTestService)
  viewTestService!: viewTestService
  

  @Get("/test")
  async hello() {
    const data = await this.viewTestService.get_ViewTest()
    return {
      msg:"ok",
      code:0,
      data
    }
  }

}