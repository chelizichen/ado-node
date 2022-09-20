import { Connect, Mapper, Select } from "ado-node";
import mysql from "mysql";

const conn = mysql.createConnection({});

@Mapper()
@Connect(conn)
export class AppMapper {
  @Select("select * from user")
  public async userList() {}
}
