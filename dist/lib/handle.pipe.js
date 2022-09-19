"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pipe = void 0;
const Pipe = (fn) => {
    return function (target, propertyKey, descriptor) {
        const method = descriptor.value;
        descriptor.value = async function (req, res) {
            let isNext;
            try {
                if (typeof fn === "function") {
                    isNext = fn(req);
                }
                if (fn instanceof Array) {
                    fn.forEach((fns) => {
                        if (isNext === false) {
                            return;
                        }
                        else {
                            isNext = fns(req) === undefined ? undefined : false;
                        }
                    });
                }
                if (isNext === undefined) {
                    target.constructor.prototype[propertyKey] = method;
                    await new Promise((resolve) => {
                        resolve(target.constructor.prototype[propertyKey](req, res));
                    }).then((response) => {
                        res.json(response);
                    });
                }
            }
            catch (e) {
                res.json({
                    Message: e.toString(),
                    Code: -1,
                });
                // throw new Error(e);
            }
        };
    };
};
exports.Pipe = Pipe;
//# sourceMappingURL=handle.pipe.js.map