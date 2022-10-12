import { AdoOrmBaseEnity } from "../core";
import { ref } from "../ioc/ref";

const Enity = (dbname: string) => {
  return function (target: typeof AdoOrmBaseEnity) {
    const targetInst = new target();
    targetInst.BaseEnity = target;
    targetInst.getConn(dbname);
    ref.def(target.name, targetInst, target.prototype);
  };
};
const Key: PropertyDecorator = (
  target: Object,
  propertyKey: string | symbol
) => {
  ref.def("key", propertyKey, target.constructor.prototype);
};
const Keyword: PropertyDecorator = (
  target: Object,
  propertyKey: string | symbol
) => {
  ref.def("keyword", propertyKey, target.constructor.prototype);
};

const AutoCreate: PropertyDecorator = (
  target: Object,
  propertyKey: string | symbol
) => {
  const getPrevAutoCreate = ref.get(
    "AutoCreate",
    target.constructor.prototype
  ) as string[];
  if (!getPrevAutoCreate) {
    ref.def("AutoCreate", [propertyKey], target.constructor.prototype);
  } else {
    getPrevAutoCreate.push(propertyKey as string);
    ref.def("AutoCreate", getPrevAutoCreate, target.constructor.prototype);
  }
};

const EnityTable = new Map();
export { Enity, Key, Keyword, EnityTable, AutoCreate };
