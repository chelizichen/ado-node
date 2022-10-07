import { Query } from "../../../index.d";
export function useIdPipe(req: Query<{ id: number }>) {
  if (req.query.id > 20) {
    throw new Error("id 值不能大于 20");
  }
  return;
}

export function userNamePipe(req: Query<{ name: string }>) {
  if (!req.query.name) {
    throw new Error("name 不嫩为空");
  }
  return;
}
