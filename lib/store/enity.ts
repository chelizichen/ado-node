import { ref } from "../ioc/ref";
const Enity: ClassDecorator = (target: Function) => {
  ref.def(target.name + "Enity", target.prototype, target.prototype);
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
