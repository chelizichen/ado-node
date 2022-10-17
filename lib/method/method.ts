import { SerivceMap } from "../ioc/service";
import { Request, Response } from "express";
import { ref } from "../core";
import { AdoNodePipe } from "../pipe/pipe";
import { AdoNodeInterceptor } from "../interceptor/interceptor";

function useRunTimeInterceptor(
  Interceptor: AdoNodeInterceptor,
  time: keyof AdoNodeInterceptor,
  options: {
    req: any;
    res: any;
  }
) {
  if (Interceptor) {
    if (Interceptor[time]) {
      Interceptor[time](options.req, options.res);
    }
  }
}

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

      ref.def(propertyKey as string, URL, target.constructor.prototype, ":url");

      descriptor.value = async function (req: Request, res: Response) {
        target.constructor.prototype[propertyKey] = fn;

        // AOP Interceptor
        const interceptor: AdoNodeInterceptor = ref.get(
          propertyKey as string,
          target.constructor.prototype,
          ":interceptor"
        );
        await useRunTimeInterceptor(interceptor, "before", { req, res });

        // AOP Pipe
        const pipe: AdoNodePipe = ref.get(
          propertyKey as string,
          target.constructor.prototype,
          ":pipe"
        );

        if (pipe) {
          req.closed || (await pipe.run(req, res));
        }

        await useRunTimeInterceptor(interceptor, "hack", {
          req,
          res,
        });

        req.closed ||
          res.json(await target.constructor.prototype[propertyKey](req, res));

        await useRunTimeInterceptor(interceptor, "after", {
          req,
          res,
        });
        return;
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
