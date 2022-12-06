import { AdoNodeController, Controller, Get, query } from "../../../lib/core";

@Controller("/sql")
export class SqlController extends AdoNodeController{

  @Get("/query")
  public query() {
    
    const sql = new query().setEnity(["goods", "seckill"]).and({
      "seckill.go_id": "goods.id",
      "seckill.sk_status":"0"
    }).pagination(0, 10).getSql()

    const sql1 = new query().setEnity(["goods", "seckill"]).getSql()

    const sql2 = new query().setEnity("goods").like_and({"go_name":"%1%"}).pagination(0,10).getSql()

    return { sql, sql1,sql2 };
  }
}