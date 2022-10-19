import { Ret } from "./../../config/ret";
import {
  CODE,
  Controller,
  Get,
  HandleController,
  Inject,
  MESSAGE,
  Query,
} from "ado-node";
import { FundCompanyService } from "./Company.service";

// fund company
@Controller("/fcomp")
class FundCompanyController extends HandleController {
  @Inject(FundCompanyService)
  FundService!: FundCompanyService;

  @Get("/get")
  public async getOne(@Query() query: any) {
    const id = query.id;
    const data = await this.FundService.getOne(id);
    return Ret.Message(CODE.SUCCESS, MESSAGE.SUCCESS, data);
  }
}
export { FundCompanyController };
