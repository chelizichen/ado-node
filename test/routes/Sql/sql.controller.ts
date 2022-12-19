import { AdoNodeController, Controller, Get, query } from "../../../index";
import {  getConnection } from "../../../lib/orm/conn";

@Controller("/sql")
export class SqlController extends AdoNodeController{

  @Get("/query")
  public query() {
    
    const sql = new query().setEntity(["goods", "seckill"]).and({
      "seckill.go_id": "goods.id",
      "seckill.sk_status":"0"
    }).pagination(0, 10).getSql()

    const sql1 = new query().setEntity(["goods", "seckill"]).getSql()

    const sql2 = new query().setEntity("goods").like_and({"go_name":"%1%"}).pagination(0,10).getSql()

    return { sql, sql1,sql2 };
  }

  @Get("/conn")
  public async testConn() {

    const conn = await getConnection()
    console.log(conn);
    
    return {
      msg: "ok",
      code:0
    }
  }
}