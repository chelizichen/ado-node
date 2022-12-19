import { ref } from "../../index";

const Code = (status: number): MethodDecorator => {
  return function (target: Object, propertyKey: string | symbol) {
    ref.def(
      propertyKey as string,
      status,
      target.constructor.prototype,
      ":status"
    );
  };
};

export { Code };
