import { Collect, getConnection } from "ado-node";

@Collect()
class AnimalService{
  async getList() {
    let conn = await getConnection()
    return new Promise((resolve) => {
      conn.query("select * from test", function (_, res) {
        resolve(res);
      });
    });
  }
}

export { AnimalService };