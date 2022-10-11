"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OberServer = void 0;
class OberServer {
    store = [];
    set(key, value) {
        this.store.push({ key, value });
    }
    get(key) {
        const val = this.store.find((el) => {
            return el.key === key;
        });
        return val;
    }
}
exports.OberServer = OberServer;
//# sourceMappingURL=oberserver.js.map