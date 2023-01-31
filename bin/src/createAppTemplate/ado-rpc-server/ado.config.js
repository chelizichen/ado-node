module.exports =  ({
  database: {
    type: "mysql",
    host: "localhost",
    username: "root",
    password: "123456",
    database: "test", //所用数据库
    port: 3306,
    connectionLimit: 10,
  },
  server: {
    port: 10012,
    host: "127.0.0.1",
    desc:"微服务 描述 字段"
  }
});