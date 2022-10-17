import { ref } from "../ioc/ref";
import { AdoOrmBaseEnity, RunConfig } from "./orm";

export enum ENITY_CONSTANT {
  Key = "keys",
  Keyword = "keyword",
  AutoCreate = "AutoCreate",
  DefaultValue = "__default__",
  IsOptional = "__isoptional__",
}
const Enity = (dbname: string) => {
  return function (target: typeof AdoOrmBaseEnity) {
    const targetInst = new target();
    targetInst[RunConfig](target, dbname);
    ref.def(target.name, targetInst, target.prototype);
  };
};
const Key: PropertyDecorator = (
  target: Object,
  propertyKey: string | symbol
) => {
  ref.def("key", propertyKey, target.constructor.prototype);
};
const Keyword: PropertyDecorator = (
  target: Object,
  propertyKey: string | symbol
) => {
  ref.def("keyword", propertyKey, target.constructor.prototype);
};
const AutoCreate: PropertyDecorator = (
  target: Object,
  propertyKey: string | symbol
) => {
  const getPrevAutoCreate = ref.get(
    ENITY_CONSTANT.AutoCreate,
    target.constructor.prototype
  ) as string[];
  if (!getPrevAutoCreate) {
    ref.def(
      ENITY_CONSTANT.AutoCreate,
      [propertyKey],
      target.constructor.prototype
    );
  } else {
    getPrevAutoCreate.push(propertyKey as string);
    ref.def(
      ENITY_CONSTANT.AutoCreate,
      getPrevAutoCreate,
      target.constructor.prototype
    );
  }
};
const IsEmail: PropertyDecorator = (
  target: Object,
  propertyKey: string | symbol
) => {
  const EmailValidate = (data: string) => {
    const reg = /[\w]+(\.[\w]+)*@[\w]+(\.[\w])+/;
    return reg.test(data);
  };
  ref.def(propertyKey as string, EmailValidate, target.constructor.prototype);
};
const IsNumber: PropertyDecorator = (
  target: Object,
  propertyKey: string | symbol
) => {
  const IsNum = (num: any) => {
    return !isNaN(num);
  };
  ref.def(propertyKey as string, IsNum, target.constructor.prototype);
};
/**
 * @IsOptional 可选的 如果无参数传入 则使用默认的参数
 */
const IsOptional: PropertyDecorator = (
  target: Object,
  propertyKey: string | symbol
) => {
  const RetTrue = () => true;
  ref.def(propertyKey as string, RetTrue, target.constructor.prototype);
};

const EnityTable = new Map();
export {
  Enity,
  Key,
  Keyword,
  IsEmail,
  IsOptional,
  IsNumber,
  EnityTable,
  AutoCreate,
};
