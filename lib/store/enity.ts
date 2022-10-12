import { ClassConstructor } from "../core";
import { ref } from "../ioc/ref";
const Enity = (dbname: string) => {
  return function (target: ClassConstructor) {
    const targetInst = new target(target, dbname);
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
const EnityTable = new Map();
export { Enity, Key, Keyword, EnityTable };
