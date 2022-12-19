"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoCreate = exports.EnityTable = exports.IsNumber = exports.IsOptional = exports.IsEmail = exports.Keyword = exports.Key = exports.Entity = exports.ENTITY_CONSTANT = void 0;
const ref_1 = require("../ioc/ref");
const symbol_1 = require("./symbol");
var ENTITY_CONSTANT;
(function (ENTITY_CONSTANT) {
    ENTITY_CONSTANT["Key"] = "keys";
    ENTITY_CONSTANT["Keyword"] = "keyword";
    ENTITY_CONSTANT["AutoCreate"] = "AutoCreate";
    ENTITY_CONSTANT["DefaultValue"] = "__default__";
    ENTITY_CONSTANT["IsOptional"] = "__isoptional__";
})(ENTITY_CONSTANT = exports.ENTITY_CONSTANT || (exports.ENTITY_CONSTANT = {}));
const Entity = (dbname) => {
    return function (target) {
        const targetInst = new target();
        ref_1.ref.def(target.name, targetInst, target.prototype);
        targetInst[symbol_1.RunConfig](target, dbname);
    };
};
exports.Entity = Entity;
const Key = (target, propertyKey) => {
    ref_1.ref.def("key", propertyKey, target.constructor.prototype);
};
exports.Key = Key;
const Keyword = (target, propertyKey) => {
    ref_1.ref.def("keyword", propertyKey, target.constructor.prototype);
};
exports.Keyword = Keyword;
const AutoCreate = (target, propertyKey) => {
    const getPrevAutoCreate = ref_1.ref.get(ENTITY_CONSTANT.AutoCreate, target.constructor.prototype);
    if (!getPrevAutoCreate) {
        ref_1.ref.def(ENTITY_CONSTANT.AutoCreate, [propertyKey], target.constructor.prototype);
    }
    else {
        getPrevAutoCreate.push(propertyKey);
        ref_1.ref.def(ENTITY_CONSTANT.AutoCreate, getPrevAutoCreate, target.constructor.prototype);
    }
};
exports.AutoCreate = AutoCreate;
const IsEmail = (target, propertyKey) => {
    const EmailValidate = (data) => {
        const reg = /[\w]+(\.[\w]+)*@[\w]+(\.[\w])+/;
        return reg.test(data);
    };
    ref_1.ref.def(propertyKey, EmailValidate, target.constructor.prototype);
};
exports.IsEmail = IsEmail;
const IsNumber = (target, propertyKey) => {
    const IsNum = (num) => {
        return !isNaN(num);
    };
    ref_1.ref.def(propertyKey, IsNum, target.constructor.prototype);
};
exports.IsNumber = IsNumber;
/**
 * @IsOptional 可选的 如果无参数传入 则使用默认的参数
 */
const IsOptional = (target, propertyKey) => {
    const RetTrue = () => true;
    ref_1.ref.def(propertyKey, RetTrue, target.constructor.prototype);
};
exports.IsOptional = IsOptional;
const EnityTable = new Map();
exports.EnityTable = EnityTable;
//# sourceMappingURL=enity.js.map