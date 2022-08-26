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
      descriptor.value = function (req: Request, res: Response) {
        try {
          target.constructor.prototype[propertyKey] = fn;
          res.json(target.constructor.prototype[propertyKey](req, res));
        } catch {
          res.json(HandleError);
        }
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
