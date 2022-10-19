import { SerivceMap } from "../ioc/service";
import { Request } from "express";
import { ref } from "../core";
import { AdoNodePipe } from "../pipe/pipe";
import { AdoNodeInterceptor } from "../interceptor/interceptor";

export function useRunTimeInterceptor(
  Interceptor: AdoNodeInterceptor,
  time: keyof AdoNodeInterceptor,
  options: {
    req: any;
  }
) {
  if (Interceptor) {
    if (Interceptor[time]) {
      return Interceptor[time](options.req);
    }
  }
  return undefined;
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

      descriptor.value = async function (req: Request) {
        target.constructor.prototype[propertyKey] = fn;

        // AOP Interceptor
        const interceptor: AdoNodeInterceptor = ref.get(
          propertyKey as string,
          target.constructor.prototype,
          ":interceptor"
        );
        const before_data = await useRunTimeInterceptor(interceptor, "before", {
          req,
        });
        if (before_data) {
          return before_data;
        }

        // AOP Pipe
        const pipe: AdoNodePipe = ref.get(
          propertyKey as string,
          target.constructor.prototype,
          ":pipe"
        );

        if (pipe) {
          const pipe_data = await pipe.run(req);
          if (pipe_data) {
            return pipe_data;
          }
        }

        const hack_data = await useRunTimeInterceptor(interceptor, "hack", {
          req,
        });
        if (hack_data) {
          return hack_data;
        }

        const hasQuery = ref.get(
          propertyKey as string,
          target.constructor.prototype,
          ":query"
        );
        const hasBody = ref.get(
          propertyKey as string,
          target.constructor.prototype,
          ":body"
        );
        const hasHeaders = ref.get(
          propertyKey as string,
          target.constructor.prototype,
          ":headers"
        );
        const hasRequest = ref.get(
          propertyKey as string,
          target.constructor.prototype,
          ":request"
        );
        if (
          typeof hasQuery === "number" ||
          typeof hasBody === "number" ||
          typeof hasHeaders === "number" ||
          typeof hasRequest == "number"
        ) {
          // const arguments = [req.query]
          let arg = [];
          arg[hasQuery] = req.query;
          arg[hasBody] = req.body;
          arg[hasHeaders] = req.headers;
          arg[hasRequest] = req;
          const ret = await target.constructor.prototype[propertyKey](...arg);
          if (ret && interceptor && interceptor.after) {
            return {
              data: ret,
              after: interceptor.after,
            };
          }
          if (ret && !interceptor) {
            return {
              data: ret,
            };
          }
        } else {
          const ret = await target.constructor.prototype[propertyKey](req);
          if (ret && interceptor && interceptor.after) {
            return {
              data: ret,
              after: interceptor.after,
            };
          }
          if (ret && !interceptor) {
            return {
              data: ret,
            };
          }
        }

        // unMounted

        // if (req.closed) {
        //   useRunTimeInterceptor(interceptor, "after", {
        //     req,
        //     res,
        //   });
        // }
        return {
          msg: "ok",
          code: 0,
        };
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
