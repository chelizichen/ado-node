import { ref } from "../ioc/ref";

export type ErrorType<E = string, Code = number> = {
  message: E;
  code?: Code;
  force?: boolean;
};

const Error = (e: ErrorType): MethodDecorator => {
  return function (
    _target: Object,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    if (e.force) {
      descriptor.value = function (_req: any, res: any) {
        const { message, code } = e;
        res.json({ message, code });
      };
    }
    ref.def("error", e, descriptor.value);
  };
};
export { Error };
