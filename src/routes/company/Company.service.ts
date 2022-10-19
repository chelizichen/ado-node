import { Conn } from "./../../types/index";
import { CONSTANT } from "./../../config/constant";
import { Collect, Inject, UseDataBase } from "ado-node";
import { Fund_Company } from "./Company.enity";

@Collect()
class FundCompanyService {
  @UseDataBase(CONSTANT.MYSQL)
  dataBase!: Conn;

  @Inject(Fund_Company)
  FComp!: Fund_Company;

  async getOne(id: string) {
    const data = await this.FComp.getOneBy(id);
    // 10000018;
    return data;
  }
}

export { FundCompanyService };
