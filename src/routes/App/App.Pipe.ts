import { Query } from "ado-node/lib/core";

export function userIdPipe(req: Query<{ id: number }>) {
  if (req.query.id > 20) {
    throw new Error("id 的值不能大于20");
  }
  return;
}
