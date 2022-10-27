import { ref } from "../ioc/ref";
import { CONSTANT } from "../constant/constant";
import { OberServer } from "../ober/oberserver";
import { nextTick } from "process";

const CreateDataBase = (dbname: string) => {
  return function (
    target: Object,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const val = descriptor.value();

    ref.def(dbname, val, target.constructor.prototype);
  };
};

const UseDataBase = (dbName: string): PropertyDecorator => {
  return function (target: Object, propertyKey: string | symbol) {
    let OberInst = ref.get(
      CONSTANT.Observer,
      OberServer.prototype
    ) as OberServer;

    const CommonClass = OberInst.get(CONSTANT.Config)?.value;
    const DbInst = ref.get(dbName, CommonClass.prototype);

    target.constructor.prototype[propertyKey] = DbInst;
    nextTick(async () => {
      target.constructor.prototype[propertyKey] = await DbInst;
    });
  };
};
export { CreateDataBase, UseDataBase };
