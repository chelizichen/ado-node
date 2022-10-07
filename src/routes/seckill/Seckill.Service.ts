import { Collect } from "ado-node";
import { RedisClientType } from "redis";

@Collect()
export class SeckillService {
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
}
