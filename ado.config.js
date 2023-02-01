module.exports = ({
  database: [{
    default:true,
    type: "mysql",
    host: "localhost",
    username: "root",
    password: "123456",
    database: "zrq_shop", //所用数据库
    port: 3306,
    connectionLimit: 10,
  },{
    type: "mysql",
    host: "localhost",
    username: "root",
    password: "123456",
    database: "lmr_medical", //所用数据库
    port: 3306,
    connectionLimit: 10,
  }],
  server:{
    base: "/api",
    port: 3000,
    host:"127.0.0.1",
    upload:"public/server"
  },
  microService: {
    port: 9000,
    host:"127.0.0.1",
  }
});