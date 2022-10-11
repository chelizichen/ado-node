"use strict";
/**
 * .then .then .then .then .then
 * store ( Array<fn> )
 * add( fn:callback , weight:number )
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.cfjs = exports.useRunCf = exports.useCffn = void 0;
function useCffn(fn, weight) {
    cfjs.add(fn, weight);
}
exports.useCffn = useCffn;
function useRunCf() {
    cfjs.run();
}
exports.useRunCf = useRunCf;
class cfjs {
    static store = [];
    static add(fn, weight) {
        cfjs.store.push({ fn, weight });
    }
    static sort() {
        cfjs.store.sort((a, b) => {
            return a.weight - b.weight;
        });
    }
    static run() {
        cfjs.sort();
        cfjs.store.forEach((el) => {
            el.fn();
        });
    }
}
exports.cfjs = cfjs;
//# sourceMappingURL=cfjs.js.map