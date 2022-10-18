"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.UsePipe = void 0;
const core_1 = require("../core");
const field_1 = require("../error/field");
const enity_1 = require("../orm/enity");
const UsePipe = (fn) => {
    return function (target, propertyKey) {
        core_1.ref.def(propertyKey, fn, target.constructor.prototype, ":pipe");
    };
};
exports.UsePipe = UsePipe;
function validate(inst) {
    let errorfield = {};
    // 得到所有自动生成的
    const Autocreate = core_1.ref.get(enity_1.ENITY_CONSTANT.AutoCreate, inst.__proto__);
    // 过滤不需要判断的
    const Filter = Object.getOwnPropertyNames(inst).filter((el) => Autocreate.indexOf(el) == -1);
    const isError = Filter.some((el) => {
        const func = core_1.ref.get(el, inst.__proto__);
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
        return new field_1.FieldError(`${errorfield.key + " " + errorfield.value} 存在错误`);
    }
    return !isError;
}
exports.validate = validate;
//# sourceMappingURL=pipe.js.map