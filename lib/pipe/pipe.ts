import { NextFunction, Response, Request } from "express";
import { ref } from "../core";
import { FieldError } from "../error/field";
import { ENITY_CONSTANT } from "../orm/enity";

const UsePipe = (fn: AdoNodePipe): MethodDecorator => {
  return function (target: Object, propertyKey: string | symbol) {
    ref.def(propertyKey as string, fn, target.constructor.prototype, ":pipe");
  };
};

/**
 * @interface AdoNodePipe
 * @use 在代码进入进入控制层时进行判断 参数校验 另外的逻辑判断
 * @params context
 */

interface AdoNodePipe {
  run(req: Request): Promise<any>;
}

function validate(inst: any) {
  let errorfield: Record<string, any> = {};
  // 得到所有自动生成的
  const Autocreate = ref.get(
    ENITY_CONSTANT.AutoCreate,
    inst.__proto__
  ) as string[];
  // 过滤不需要判断的
  const Filter = Object.getOwnPropertyNames(inst).filter(
    (el) => Autocreate.indexOf(el) == -1
  );
  const isError = Filter.some((el) => {
    const func = ref.get(el, inst.__proto__);
    const ret = func(inst[el]);
    if (!ret) {
      errorfield = {
        key: el,
        value: inst[el],
      };
      return true;
    }
    return false;
  });
  if (isError) {
    return new FieldError(
      `${errorfield.key + " " + errorfield.value} 存在错误`
    );
  }
  return !isError;
}

interface AdoNodeGlobalPipe {
  run(req: Request, res: Response, next: NextFunction): void;
}

export { UsePipe, validate };
export type { AdoNodePipe, AdoNodeGlobalPipe };
