import * as jwt from "jsonwebtoken";

class AdoNodeRole {
  static RoleMap = new Map<string, string[]>();
  getToken(
    header: { token: string },
    body: { role: string; username: string; password: string; email: string },
    time: number
  ) {
    if (!header.token) {
      // 如果过期 重新登陆 获得token
      if (body.role) {
        jwt.sign({ user: body, role: body.role }, "AdoNodeRole", {
          expiresIn: time,
        });
      } else {
        // 没有角色 禁止访问
      }
    }
  }
  verify(token: string) {
    jwt.verify(token, "AdoNodeRole", function () {});
  }
}

export { AdoNodeRole };
