import { Inject, Collect } from "../../../lib/handle.inject";
import { App919Mapper } from "./App919.mapper";

@Collect()
export class App919Service {
  @Inject(App919Mapper)
  App919Mapper!: App919Mapper;

  public async a1() {
    return await this.App919Mapper.getList();
  }
}
