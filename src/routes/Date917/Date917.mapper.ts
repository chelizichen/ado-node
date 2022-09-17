import { Connect, Mapper, Select } from "../../lib/handle.mapper";
import * as mysql from "mysql";

const config = {
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "boot", //所用数据库
  port: "3306",
};
const coon = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});
type selectOptions = any[];

/**
 * @Mapper 数据库操作层
 * @Connect 数据库链接
 */

@Mapper()
@Connect(coon)
class Date917Mapper {
  @Select(`select * from  user where id = ? `)
  public async userList(_options: selectOptions) {}
}

export { Date917Mapper };
