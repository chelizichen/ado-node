import SerivceMap from "./handle.service";
import { Request, Response } from "express";
import { ref } from "../utils/core";

/**
 * @Prarams Method Like GET POST
 */
const createMethod = (method: string) => {
  return (URL: string): MethodDecorator => {
    return function (
      target: Object,
      propertyKey: string | symbol,
      descriptor: PropertyDescriptor
    ) {
      const HandleError = ref.get("error", descriptor.value);
      const fn = descriptor.value;
      descriptor.value = async function (req: Request, res: Response) {
        target.constructor.prototype[propertyKey] = fn;
        await new Promise((resolve, reject) => {
          resolve(target.constructor.prototype[propertyKey](req, res));
          reject(HandleError);
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

export const Get = createMethod("Get");
export const Post = createMethod("Post");
