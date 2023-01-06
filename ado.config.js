
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
});