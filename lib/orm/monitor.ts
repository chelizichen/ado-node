/**
 * @Monitor
 * @Autohr chelizichen
 * @Date 2022.12.9
 */

import { ref } from "../core";



const BeforeInsert: MethodDecorator = (
  target: Object,
  _propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => {
  const val = descriptor.value;
  ref.def("monitor", val, target.constructor.prototype, ":before-insert");
};

const BeforeDestory: MethodDecorator = (
  target: Object,
  _propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => {
  const val = descriptor.value;
  ref.def("monitor", val, target.constructor.prototype, ":before-destory");
};

const BeforeUpdate: MethodDecorator = (
  target: Object,
  _propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => {
  const val = descriptor.value;
  ref.def("monitor", val, target.constructor.prototype, ":before-update");
};

const AfterUpdate: MethodDecorator = (
  target: Object,
  _propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => {
  const val = descriptor.value;
  ref.def("monitor", val, target.constructor.prototype, ":after-update");
};

const AfterInsert: MethodDecorator = (
  target: Object,
  _propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => {
  const val = descriptor.value;
  ref.def("monitor", val, target.constructor.prototype, ":after-insert");
};

const AfterDestory: MethodDecorator = (
  target: Object,
  _propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => { 
    const val = descriptor.value;
    ref.def("monitor", val, target.constructor.prototype, ":after-destory");
};

export {
  BeforeInsert,
  BeforeDestory,
  BeforeUpdate,
  AfterDestory,
  AfterUpdate,
  AfterInsert,
};
