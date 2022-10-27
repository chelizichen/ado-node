"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseDataBase = exports.CreateDataBase = void 0;
const ref_1 = require("../ioc/ref");
const constant_1 = require("../constant/constant");
const oberserver_1 = require("../ober/oberserver");
const process_1 = require("process");
const CreateDataBase = (dbname) => {
    return function (target, _propertyKey, descriptor) {
        const val = descriptor.value();
        ref_1.ref.def(dbname, val, target.constructor.prototype);
    };
};
exports.CreateDataBase = CreateDataBase;
const UseDataBase = (dbName) => {
    return function (target, propertyKey) {
        let OberInst = ref_1.ref.get(constant_1.CONSTANT.Observer, oberserver_1.OberServer.prototype);
        const CommonClass = OberInst.get(constant_1.CONSTANT.Config)?.value;
        const DbInst = ref_1.ref.get(dbName, CommonClass.prototype);
        target.constructor.prototype[propertyKey] = DbInst;
        (0, process_1.nextTick)(async () => {
            target.constructor.prototype[propertyKey] = await DbInst;
        });
    };
};
exports.UseDataBase = UseDataBase;
//# sourceMappingURL=db.js.map