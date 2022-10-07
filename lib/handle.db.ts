import { ref } from "./handle.reflect";

// target: Object,
// propertyKey: string | symbol,
// descriptor: PropertyDescriptor

export const CreateDb = (dbname: string): MethodDecorator => {
  return function (
    target: Object,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const val = descriptor.value();
    ref.def(dbname, val, target.constructor.prototype);
  };
};
