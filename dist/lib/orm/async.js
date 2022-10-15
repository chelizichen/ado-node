"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Async = void 0;
const Async = (_, __, descriptor) => {
    const methods = descriptor.value;
    descriptor.value = function (...args) {
        return new Promise(async (resolve, reject) => {
            try {
                const value = methods(args);
                resolve(value);
            }
            catch (e) {
                reject(e);
            }
        });
    };
};
exports.Async = Async;
//# sourceMappingURL=async.js.map