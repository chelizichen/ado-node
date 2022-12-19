import { defineAdoNodeConfig } from "../lib/orm/conn"

export default defineAdoNodeConfig({
  database: {
    type: "mysql",
    host: "localhost",
    username: "root",
    password: "123456",
    database: "zrq_shop", //所用数据库
    port: 3306,
    connectionLimit: 10,
  },
});