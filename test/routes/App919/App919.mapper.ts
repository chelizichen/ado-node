import { Mapper, UseDataBase, query } from "../../../index";
import { Fund_Star } from "./App919.enity";
import * as mysql from "mysql";
@Mapper()
class App919Mapper {
  @UseDataBase("mysql")
  mysqlConn!: mysql.Connection;

  async getCompanyList() {
    return new Promise((resolve, reject) => {
      const sql = new query().setEnity(Fund_Star).pagination(0, 10).getMany();
      this.mysqlConn.query(sql, function (err: Error, res: any) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}

export { App919Mapper };
