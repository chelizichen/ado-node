import { ref } from "../ioc/ref";
import * as mysql from "mysql";

import { CONSTANT } from "../constant/constant";
import { OberServer } from "../ober/oberserver";

const Connect = (dbname: string, _Config?: Function): ClassDecorator => {
  return function (target: Function) {
    const OberInst = ref.get(
      CONSTANT.Observer,
      OberServer.prototype
    ) as OberServer;
    console.log("使用数据库连接", OberInst);
    const CommonClass = OberInst.get(CONSTANT.Config)?.value;
    const connInst = ref.get(dbname, CommonClass.prototype);
    ref.def("coon", connInst, target.prototype);
    // const connInst = ref.get(dbname, Config.prototype);
    // ref.def("coon", connInst, target.prototype);
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
