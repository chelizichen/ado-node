"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Insert = exports.Update = exports.Select = exports.Connect = exports.Mapper = void 0;
const handle_reflect_1 = require("./handle.reflect");
const Connect = (coon) => {
    return function (target) {
        handle_reflect_1.ref.def("coon", coon, target.prototype);
    };
};
exports.Connect = Connect;
const Mapper = () => {
    return function (target) {
        handle_reflect_1.ref.def(target, target.prototype);
    };
};
exports.Mapper = Mapper;
const Select = (sql) => {
    return function (target, _propertyKey, descriptor) {
        descriptor.value = async function (options) {
            const coon = handle_reflect_1.ref.get("coon", target.constructor.prototype);
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
//# sourceMappingURL=handle.mapper.js.map