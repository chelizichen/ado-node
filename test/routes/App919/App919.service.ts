import { Inject, Collect } from "../../../lib/ioc/ioc";
import { App919Mapper } from "./App919.mapper";

@Collect()
export class App919Service {
  @Inject(App919Mapper)
  App919Mapper!: App919Mapper;

  public async getCompanyList() {
    return await this.App919Mapper.getCompanyList();
  }
}
