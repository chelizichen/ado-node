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

const Curd = (
  CurdUrl: string,
  Enity: Function,
  coon: mysql.Connection
): MethodDecorator => {
  return function (
    _target: Object,
    _propertyKey: string | symbol,
    _descriptor: PropertyDescriptor
  ) {
    const url = getCurdUrl(CurdUrl);
    const selectTest = curd_list(Enity);
    function demo(_req: Request, res: Response) {
      new Promise((resolve, reject) => {
        coon.query(selectTest, function (err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      }).then((ret) => {
        // @ts-ignore
        res.json(ret);
      });
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
