// const cwd = process.cwd()
// const publicPath = cwd + ""

export default ({
  // module:[
    // "test"
  // ],
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