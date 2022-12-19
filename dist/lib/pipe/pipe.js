"use strict";
/**
 * @Author chelizichen
 * @interface AdoNodePipe
 * @use 在代码进入进入控制层时进行判断 参数校验 另外的逻辑判断
 * @params context
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.UsePipe = void 0;
const ioc_1 = require("../ioc");
const field_1 = require("../error/field");
const orm_1 = require("../orm");
const UsePipe = (fn) => {
    return function (target, propertyKey) {
        ioc_1.ref.def(propertyKey, fn, target.constructor.prototype, ":pipe");
    };
};
exports.UsePipe = UsePipe;
function validate(Proto, inst) {
    let errorfield = {};
    let Autocreate = ioc_1.ref.get(orm_1.ENTITY_CONSTANT.AutoCreate, Proto.prototype);
    if (!Autocreate) {
        Autocreate = [];
    }
    const getnames = Object.getOwnPropertyNames(new Proto());
    const filters = getnames.filter((el) => Autocreate.indexOf(el) == -1);
    const err = filters.some((el) => {
        let ret;
        const func = ioc_1.ref.get(el, Proto.prototype);
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
        return new field_1.FieldError(`${errorfield.key + " " + errorfield.value} 存在错误`);
    }
    return;
}
exports.validate = validate;
//# sourceMappingURL=pipe.js.map