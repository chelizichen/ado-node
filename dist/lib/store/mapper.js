"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Insert = exports.Update = exports.Select = exports.Connect = exports.Mapper = void 0;
const ref_1 = require("../ioc/ref");
const constant_1 = require("../constant/constant");
const oberserver_1 = require("../ober/oberserver");
const Connect = (dbname) => {
    return function (target) {
        const OberInst = ref_1.ref.get(constant_1.CONSTANT.Observer, oberserver_1.OberServer.prototype);
        const CommonClass = OberInst.get(constant_1.CONSTANT.Config)?.value;
        const connInst = ref_1.ref.get(dbname, CommonClass.prototype);
        ref_1.ref.def("coon", connInst, target.prototype);
    };
};
exports.Connect = Connect;
const Mapper = () => {
    return function (target) {
        ref_1.ref.def(target, target.prototype);
    };
};
exports.Mapper = Mapper;
const Select = (sql) => {
    return function (target, _propertyKey, descriptor) {
        descriptor.value = async function (options) {
            const coon = await ref_1.ref.get("coon", target.constructor.prototype);
            const res = await new Promise((resolve, reject) => {
                coon.query(sql, options, function (err, res) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(res);
                    }
                });
            });
            return res;
        };
    };
};
exports.Select = Select;
const Update = Select;
exports.Update = Update;
const Delete = Select;
exports.Delete = Delete;
const Insert = Select;
exports.Insert = Insert;
//# sourceMappingURL=mapper.js.map