import { RedisClientType } from "@redis/client";
import { Collect, Inject } from "ado-node";
import { UserMapper } from "./User.Mapper";

@Collect()
class UserService {
  @Inject(UserMapper)
  UserMapper!: UserMapper;

  public async getList(id: number) {
    const opt = [id];
    const ret = await this.UserMapper.getList(opt);
    return ret;
  }
  public getUserKey(_redis: RedisClientType<any, any, any>, UID: string) {
    const key = `sk:${UID}:qt`;
    return key;
  }
}

export { UserService };
