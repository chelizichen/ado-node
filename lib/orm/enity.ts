/**
 * @author chelizichen
 * @description 暴露实体类所需要的装饰器
 */

import { _Entity_ } from "./index";
import { ref } from "../ioc/ref";
import { AdoOrmBaseEntity } from "./orm";
import { ENTITY_CONSTANT, RunConfig } from "./symbol";




const Entity: _Entity_ = (tbname: string,database?:string) => {
  return function (target: typeof AdoOrmBaseEntity) {
    const targetInst = new target();
    const { name, prototype } = target
    ref.def(name, targetInst, prototype);
    ref.def(":tablename", tbname, prototype);
    ref.def(":database_name",database,prototype)
    targetInst[RunConfig](target, tbname);
  };
};


const Key: PropertyDecorator = (
  target: Object,
  propertyKey: string | symbol
) => {
  ref.def("key", propertyKey, target.constructor.prototype);
};


const Index: PropertyDecorator = (
  target: Object,
  propertyKey: string | symbol
) => {
  ref.def("index", propertyKey, target.constructor.prototype);
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
    ENTITY_CONSTANT.AutoCreate,
    target.constructor.prototype
  ) as string[];
  if (!getPrevAutoCreate) {
    ref.def(
      ENTITY_CONSTANT.AutoCreate,
      [propertyKey],
      target.constructor.prototype
    );
  } else {
    getPrevAutoCreate.push(propertyKey as string);
    ref.def(
      ENTITY_CONSTANT.AutoCreate,
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


export {
  Entity,
  Key,
  Keyword,
  IsEmail,
  IsOptional,
  IsNumber,
  AutoCreate,
  Index,
};
