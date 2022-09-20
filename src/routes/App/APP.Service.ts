import { Collect, Inject } from "ado-node";
import { AppMapper } from "./App.Mapper";

@Collect()
export class AppService {
  @Inject(AppMapper)
  AppMapper!: AppMapper;
  public async userList() {
    return await this.AppMapper.userList();
  }
}
