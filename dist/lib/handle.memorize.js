"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memorizeDto = exports.memorize = void 0;
function memorize(fn) {
    const cache = {};
    return (...args) => {
        const key = JSON.stringify(args);
        if (!cache[key]) {
            cache[key] = fn(...args);
        }
        return cache[key];
    };
}
exports.memorize = memorize;
function memorizeDto(key, inst) {
    const cache = {};
    return () => {
        if (!cache[key]) {
            cache[key] = inst();
        }
        return cache[key];
    };
}
exports.memorizeDto = memorizeDto;
//# sourceMappingURL=handle.memorize.js.map