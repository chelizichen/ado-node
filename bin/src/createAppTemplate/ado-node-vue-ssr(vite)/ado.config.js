import { defineAdoNodeConfig } from "ado-node";

export default defineAdoNodeConfig({
  database: {
    type: "mysql",
    host: "localhost",
    username: "root",
    password: "123456",
    database: "test",
    port: 3306,
    connectionLimit: 10,
  },
});
