import { AdoOrmBaseEnity, ref } from "../core";
import * as __ from "lodash";
import { ENITY_CONSTANT } from "../orm/enity";

type plain = Record<string, any>;
class class_transform {
  static plainToClass<T extends AdoOrmBaseEnity, V extends plain | plain[]>(
    toClass: new (...args: any[]) => T,
    plain: V
  ): V extends Array<any> ? T[] : T {
    if (plain instanceof Array) {
      let retPlain = plain.map((el) => {
        const inst = new toClass();
        return __.assign(inst, el) as unknown as T;
      });
      return retPlain as V extends Array<any> ? T[] : T;
    } else {
      const inst = new toClass();
      let retPlain = __.assign(inst, plain) as unknown as T;
      return retPlain as V extends Array<any> ? T[] : T;
    }
  }
  static __classToPlain__(get: string[], inst: any): plain {
    const plain: plain = {};
    get.forEach((el) => {
      // @ts-ignore
      plain[el] = inst[el];
    });
    return plain;
  }
  // 当 options 为 true 的时候 过滤 类中需要过滤的键
  static classToPlain<T extends AdoOrmBaseEnity[] | AdoOrmBaseEnity>(
    classInst: T,
    options?: {
      exclude: boolean;
    }
  ): T extends Array<any> ? plain[] : plain {
    // 默认开启过滤模式
    if (!options || options.exclude) {
      if (classInst instanceof Array) {
        let plain = classInst.map((inst) => {
          const filt = ref.get(
            ENITY_CONSTANT.AutoCreate,
            inst.constructor.prototype
          ) as string[];
          const keys = Object.getOwnPropertyNames(inst);
          const get = keys
            .map((el) => {
              return filt.indexOf(el) == -1 ? el : undefined;
            })
            .filter((el) => el) as string[];
          return this.__classToPlain__(get, inst);
        });
        return plain;
      } else {
        const filt = ref.get(
          ENITY_CONSTANT.AutoCreate,
          classInst.constructor.prototype
        ) as string[];
        const keys = Object.getOwnPropertyNames(classInst);
        const get = keys
          .map((el) => {
            return filt.indexOf(el) == -1 ? el : undefined;
          })
          .filter((el) => el) as string[];
        return this.__classToPlain__(get, classInst) as any;
      }
    } else {
      if (classInst instanceof Array) {
        let plain = classInst.map((inst) => {
          const keys = Object.getOwnPropertyNames(inst).filter((el) => el);
          return this.__classToPlain__(keys, inst);
        });
        return plain;
      } else {
        const keys = Object.getOwnPropertyNames(classInst).filter((el) => el);
        return this.__classToPlain__(keys, classInst) as any;
      }
    }
  }
}

// @Enity("mysql")
// @Collect()
// export class User extends AdoOrmBaseEnity {
//   @Key
//   @AutoCreate
//   id!: number;

//   @IsNumber
//   phone!: number;

//   @Keyword
//   @IsOptional
//   username!: string;

//   @IsNumber
//   password!: string;

//   @AutoCreate
//   getNameAndPhone() {
//     return this.username + this.phone;
//   }

//   @IsEmail
//   email!: string;

//   @AutoCreate
//   @IsOptional
//   createTime!: string;
// }

// let a = new transform();

// const p = a.plainToClass(User, {
//   phone: "123",
//   username: "lee",
//   password: "123",
// });

// const v = a.plainToClass(User, [
//   {
//     phone: "123",
//     username: "lee",
//     password: "123",
//   },
//   ,
//   {
//     phone: "123",
//     username: "lee",
//     password: "123",
//   },
//   ,
//   {
//     phone: "123",
//     username: "lee",
//     password: "123",
//   },
// ]);

// // const c = a.classToPlain(p, { exclude: true });
// const c = a.classToPlain(p);
// const d = a.classToPlain(v);

// const e = a.classToPlain(p, { exclude: false });
// const f = a.classToPlain(v, { exclude: false });

// console.log("p.getNameAndPhone()", p.getNameAndPhone());

// console.log("c", c);
// console.log("d", d);

// console.log("e", e);
// console.log("f", f);

// console.log("p", p);

// console.log("v", v);

export { class_transform };
