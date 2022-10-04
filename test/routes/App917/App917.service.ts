import { Collect, Inject } from "../../../lib/handle.inject";
import { App917Mapper } from "./App917.mapper";

@Collect()
class App917Service {
  @Inject(App917Mapper)
  App917Mapper!: App917Mapper;

  public async a1() {
    const opt = ["19"];
    const ret = await this.App917Mapper.userList(opt);
    return ret;
  }
}

export { App917Service };
