import * as jwt from "jsonwebtoken";
import { ref } from "../../core";

const Role = (key: string, roles: string[]) => {
  return function (
    target: any,
    propertyKey?: string,
    descriptor?: PropertyDescriptor
  ) {
    if (propertyKey && descriptor) {
      const url = ref.get(propertyKey, target.constructor.prototype, "url");
      console.log("url", url, roles);
      AdoNodeRole.RoleMap.set(key, roles);
    } else {
      AdoNodeRole.RoleMap.set(key, roles);
      const url = ref.get("BaseUrl", target.prototype);
      console.log("url", url, roles);
      // 走控制层守卫
    }
  };
};

// @Role(User:[])

class AdoNodeRole {
  static RoleMap = new Map<string, string[]>();
  getToken(
    header: { token: string },
    body: { role: string; username: string; password: string },
    time: number
  ) {
    if (!header.token) {
      if (body.role) {
        jwt.sign({ user: body, role: body.role }, "AdoNodeRole", {
          expiresIn: time,
        });
      }
    }
  }
  verify(token: string) {
    jwt.verify(token, "AdoNodeRole", function () {});
  }
}

export { AdoNodeRole, Role };
