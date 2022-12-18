
/**
 * @Author chelizichen
 * @interface AdoNodePipe
 * @use 在代码进入进入控制层时进行判断 参数校验 另外的逻辑判断
 * @params context
 */

import { NextFunction, Response, Request } from "express";
import { ref } from "../core";
import { FieldError } from "../error/field";
import { ENTITY_CONSTANT as ENTITY } from "../orm";


interface AdoNodePipe {
  run(req: Request): any;
}

const UsePipe = (fn: AdoNodePipe): MethodDecorator => {
  return function (target: Object, propertyKey: string | symbol) {
    ref.def(propertyKey as string, fn, target.constructor.prototype, ":pipe");
  };
};




function validate(Proto: new (...args:any[])=>void, inst: Record<string,any>) {
  let errorfield: Record<string, any> = {};

  let Autocreate = ref.get(ENTITY.AutoCreate, Proto.prototype) as string[];
  if (!Autocreate) {
    Autocreate = []
  }
  const getnames = Object.getOwnPropertyNames(new Proto());

  const filters = getnames.filter((el) => Autocreate.indexOf(el) == -1);

  const err = filters.some((el) => {
    let ret;
    const func = ref.get(el, Proto.prototype);
    if (func) {
      ret = func(inst[el]);
      if (!ret) {
        errorfield = {
          key: el,
          value: inst[el],
        };
        return true;
      }
      return false;
    }
    return false;
  });
  if (err) {
    return new FieldError(
      `${errorfield.key + " " + errorfield.value} 存在错误`
    );
  }
  return ;
}

interface AdoNodeGlobalPipe {
  run(req: Request, res: Response, next: NextFunction): void;
}

export { UsePipe, validate };
export type { AdoNodePipe, AdoNodeGlobalPipe };
