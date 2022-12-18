/**
 * @Monitor
 * @Autohr chelizichen
 * @Date 2022.12.9
 */

import { ref } from "../ioc";



const BeforeInsert: MethodDecorator = (
  target: Object,
  _propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => {
  const val = descriptor.value;
  ref.def("monitor", val, target.constructor.prototype, ":before-insert");
};

const BeforeDelete: MethodDecorator = (
  target: Object,
  _propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => {
  const val = descriptor.value;
  ref.def("monitor", val, target.constructor.prototype, ":before-delete");
};

const BeforeUpdate: MethodDecorator = (
  target: Object,
  _propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => {
  const val = descriptor.value;
  ref.def("monitor", val, target.constructor.prototype, ":before-update");
};



export { BeforeInsert, BeforeDelete, BeforeUpdate };
