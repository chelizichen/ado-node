"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ret = exports.user = void 0;
const handle_enity_1 = require("../../../lib/handle.enity");
let user = class user {
    id;
    phone;
    username;
    password;
};
__decorate([
    handle_enity_1.Key
], user.prototype, "id", void 0);
__decorate([
    handle_enity_1.Keyword
], user.prototype, "username", void 0);
user = __decorate([
    handle_enity_1.Enity
], user);
exports.user = user;
class Ret {
    static Message(code, msg, data) {
        return {
            code,
            msg,
            data,
        };
    }
}
exports.Ret = Ret;
//# sourceMappingURL=App917.enity.js.map