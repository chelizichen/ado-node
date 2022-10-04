import { ref } from "./handle.reflect";

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
export { Enity, Key, Keyword, EnityTable };
