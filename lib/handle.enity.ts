// @ts-nocheck
import { ref } from "./handle.reflect";
import SerivceMap from "./handle.service";
import * as mysql from "mysql";
function getCurdUrl(CurdUrl: string) {
  return {
    get: {
      list: `${CurdUrl}/list`,
      del: `${CurdUrl}/del`,
      get: `${CurdUrl}/get`,
    },
    post: {
      modify: `${CurdUrl}/modify`,
      insert: `${CurdUrl}/insert`,
    },
  };
}
const Enity: ClassDecorator = (target: Function) => {
  ref.def(target.name + "DTO", target.prototype, target.prototype);
};

const Curd = (CurdUrl: string, Enity: Function): MethodDecorator => {
  return function (
    target: Object,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const url = getCurdUrl(CurdUrl);
    const selectTest = curd_list(Enity);
    const coon: mysql.Connection = ref.get(
      "coon",
      target.constructor.prototype
    );
    async function demo(req, res) {
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
      const ret = await new Promise((resolve, reject) => {
        coon.query(selectTest, function (err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
      res.json(ret);
    }
    SerivceMap.set(url.get.list, {
      fn: demo,
      method: "Get",
    });
  };
};

function curd_list(_dto: Function) {
  return `select * from user`;
}

// const Number = (defaultValue?: string) => {
//   return function (target: Object, propertyKey: string | symbol) {
//     if (typeof defaultValue !== "number") {
//       const error = {
//         Msg: propertyKey.toString() + "is not a number",
//         Error: -10,
//       };
//       ref.def("typeError", error, target.constructor.prototype);
//     }
//   };
// };
// const String = (defaultValue?: string): PropertyDecorator => {
//   return function (target: Object, propertyKey: string | symbol) {

//   };
// };
// const Email = (defaultValue?: string): PropertyDecorator => {
//   return function (target: Object, propertyKey: string | symbol) {};
// };
export { Enity, Curd };
