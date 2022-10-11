import { ref } from "../ioc/ref";
const Enity: ClassDecorator = (target: any) => {
  const targetInst = new target(target);
  // ref.def(target, target.prototype);
  ref.def(target.name, targetInst, target.prototype);
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
