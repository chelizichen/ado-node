"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Params = exports.Res = exports.Req = exports.Headers = exports.Body = exports.Query = void 0;
const ioc_1 = require("../ioc");
function Query() {
    return function (target, propertyKey, parameterIndex) {
        ioc_1.ref.def(propertyKey, parameterIndex, target.constructor.prototype, ":query");
    };
}
exports.Query = Query;
function Body() {
    return function (target, propertyKey, parameterIndex) {
        ioc_1.ref.def(propertyKey, parameterIndex, target.constructor.prototype, ":body");
    };
}
exports.Body = Body;
function Headers() {
    return function (target, propertyKey, parameterIndex) {
        ioc_1.ref.def(propertyKey, parameterIndex, target.constructor.prototype, ":headers");
    };
}
exports.Headers = Headers;
function Req() {
    return function (target, propertyKey, parameterIndex) {
        ioc_1.ref.def(propertyKey, parameterIndex, target.constructor.prototype, ":request");
    };
}
exports.Req = Req;
function Res() {
    return function (target, propertyKey, parameterIndex) {
        ioc_1.ref.def(propertyKey, parameterIndex, target.constructor.prototype, ":response");
    };
}
exports.Res = Res;
function Params() {
    return function (target, propertyKey, parameterIndex) {
        ioc_1.ref.def(propertyKey, parameterIndex, target.constructor.prototype, ":params");
    };
}
exports.Params = Params;
//# sourceMappingURL=params.js.map