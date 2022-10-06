import { RedisClientType } from "@redis/client";
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
  public getUserKey(_redis: RedisClientType<any, any, any>, UID: string) {
    const key = `sk:${UID}:qt`;
    return key;
  }
  public async SecKill() {
    // 1 拼接库存key
    // 2 拼接秒杀成功key
    // 3 获取库存key 如果 Key == null 则库存还没有开始
    // 4 判断用户是否重复操作
    // 5 如果库存数量少于1 则停止操作
    // 6 确认操作 并且付款到账以后 并入数据库里面生成数据
  }
}

export { App917Service };
