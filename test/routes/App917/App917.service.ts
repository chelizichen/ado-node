import { RedisClientType } from "@redis/client";
import { Collect, Inject } from "../../../lib/ioc/ioc";
import { App917Mapper } from "./App917.mapper";

@Collect()
class App917Service {
  @Inject(App917Mapper)
  App917Mapper!: App917Mapper;

  public async a1() {
    const opt = ["21"];
    const ret = await this.App917Mapper.userList(opt);
    return ret;
  }
  public async getRestKey(
    redis: RedisClientType<any, any, any>,
    ProdId: string
  ) {
    const key = `sk:${ProdId}:qt`;
    let data = await redis.get(key);
    if (!data) {
      data = null;
    }
    return {
      total: Number(data),
      key,
    };
  }
  public getUserKey(UID: string) {
    const key = `sk:${UID}:user`;
    return key;
  }
  public async SecKill() {}
}

export { App917Service };
