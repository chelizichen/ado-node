type usePipe = (req: any) => void;
const Pipe = <T extends usePipe | usePipe[]>(fn: T): MethodDecorator => {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const method = descriptor.value;
    descriptor.value = async function (req: any, res: any) {
      let isNext: any;
      try {
        if (typeof fn === "function") {
          isNext = fn(req);
        }
        if (fn instanceof Array) {
          fn.forEach((fns) => {
            if (isNext === false) {
              return;
            } else {
              isNext = fns(req) === undefined ? undefined : false;
            }
          });
        }
        if (isNext === undefined) {
          target.constructor.prototype[propertyKey] = method;
          await new Promise((resolve) => {
            resolve(target.constructor.prototype[propertyKey](req, res));
          }).then((response) => {
            res.json(response);
          });
        }
      } catch (e: any) {
        res.json({
          Message: e.toString(),
          Code: -1,
        });
        // throw new Error(e);
      }
    };
  };
};

export { Pipe };
