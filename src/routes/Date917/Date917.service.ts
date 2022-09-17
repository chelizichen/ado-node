import { Collect, Inject } from "../../lib/handle.inject";
import { Date917Mapper } from "./Date917.mapper";

@Collect()
class Date917Service {
  @Inject(Date917Mapper)
  Date917Mapper!: Date917Mapper;

  public async a1() {
    const opt = ["19"];
    const ret = await this.Date917Mapper.userList(opt);
    console.log("ret", ret);
    return ret;
  }
}

export { Date917Service };
