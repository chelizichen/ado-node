"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStrCount = void 0;
// 得到sql 注入的次数
function getStrCount(aStr, aChar) {
    let result;
    let count = 0;
    if (typeof aChar === "string") {
        let regex = new RegExp(aChar, "g");
        result = aStr.match(regex);
        count = !result ? 0 : result.length;
    }
    if (aChar instanceof Array) {
        aChar.forEach((el) => {
            let regex = new RegExp(el, "g");
            result = aStr.match(regex);
            result = !result ? 0 : result.length;
            count += result;
        });
    }
    return count;
}
exports.getStrCount = getStrCount;
//# sourceMappingURL=protect.js.map