"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fund_Star = void 0;
const handle_enity_1 = require("../../../lib/handle.enity");
let Fund_Star = class Fund_Star {
    id;
    fund_name;
};
__decorate([
    handle_enity_1.Key
], Fund_Star.prototype, "id", void 0);
__decorate([
    handle_enity_1.Keyword
], Fund_Star.prototype, "fund_name", void 0);
Fund_Star = __decorate([
    handle_enity_1.Enity
], Fund_Star);
exports.Fund_Star = Fund_Star;
//# sourceMappingURL=App919.enity.js.map