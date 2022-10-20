import service from "@/util/request";

export function hello() {
  return service({
    url: "/api/user/hello",
    method: "get",
  }) as unknown as Promise<Hello>;
}

export function author() {
  return service({
    url: "/api/user/author",
    method: "get",
  }) as unknown as Promise<Author>;
}
