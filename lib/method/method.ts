import { SerivceMap } from "../ioc/service";
import { Request, Response } from "express";

/**
 * @Params Method Like GET POST
 */
const createMethod = (method: string) => {
  return (URL: string): MethodDecorator => {
    return function (
      target: Object,
      propertyKey: string | symbol,
      descriptor: PropertyDescriptor
    ) {
      const fn = descriptor.value;
      descriptor.value = async function (req: Request, res: Response) {
        target.constructor.prototype[propertyKey] = fn;
        await new Promise((resolve) => {
          resolve(target.constructor.prototype[propertyKey](req, res));
        }).then((response) => {
          res.json(response);
        });
      };

      SerivceMap.set(URL, {
        fn: descriptor.value,
        method,
      });
    };
  };
};

const Get = createMethod("Get");
const Post = createMethod("Post");

export { Get, Post };
