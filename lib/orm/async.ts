const Async: MethodDecorator = (
  _: Object,
  __: string | symbol,
  descriptor: PropertyDescriptor
) => {
  const methods = descriptor.value;
  descriptor.value = function (...args: any[]) {
    return new Promise(async (resolve, reject) => {
      try {
        const value = await methods.apply(this, args);
        resolve(value);
      } catch (e) {
        reject(e);
      }
    });
  };
};
export { Async };
