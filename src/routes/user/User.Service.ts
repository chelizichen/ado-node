import { RedisClientType } from "@redis/client";
import { Collect, Inject } from "ado-node";
import { User } from "./User.Enity";

@Collect()
class UserService {
  @Inject(User)
  User!: User;
  public getUserKey(_redis: RedisClientType<any, any, any>, UID: string) {
    const key = `sk:${UID}:qt`;
    return key;
  }

  public async List() {
    return await this.User.getList();
  }
}

export { UserService };
