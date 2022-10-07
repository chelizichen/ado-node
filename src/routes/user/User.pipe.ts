import { Query } from "ado-node/lib/types";

export function UserIdPipe(req: Query<{ id: number }>) {
  const id = req.query.id;
  if (isNaN(id)) {
    throw new Error("id 必须为数字");
  }
  return;
}
