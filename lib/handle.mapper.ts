import { ref } from "./handle.reflect";
import * as mysql from "mysql";

const Connect = (dbname: string, coon: Function): ClassDecorator => {
  return function (target: Function) {
    const connInst = ref.get(dbname, coon.prototype);
    ref.def("coon", connInst, target.prototype);
  };
};

const Mapper = (): ClassDecorator => {
  return function (target: Function) {
    ref.def(target, target.prototype);
  };
};

const Select = (sql: string) => {
  return function (
    target: Object,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    descriptor.value = async function (options: string[]) {
      const coon: mysql.Connection = await ref.get(
        "coon",
        target.constructor.prototype
      );

      const res = await new Promise((resolve, reject) => {
        coon.query(sql, options, function (err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
      return res;
    };
  };
};
const Update = Select;
const Delete = Select;
const Insert = Select;
export { Mapper, Connect, Select, Update, Insert, Delete };
