"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conn_1 = require("./lib/orm/conn");
exports.default = (0, conn_1.defineAdoNodeConfig)({
    database: {
        type: "mysql",
        host: "localhost",
        username: "root",
        password: "123456",
        database: "zrq_shop",
        port: 3306,
        connectionLimit: 10,
    },
});
//# sourceMappingURL=ado.config.js.map