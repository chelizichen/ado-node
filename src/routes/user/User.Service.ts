import { RedisClientType } from "@redis/client";
import { Collect } from "ado-node";

@Collect()
class UserService {
  public getUserKey(_redis: RedisClientType<any, any, any>, UID: string) {
    const key = `sk:${UID}:qt`;
    return key;
  }
}

export { UserService };
