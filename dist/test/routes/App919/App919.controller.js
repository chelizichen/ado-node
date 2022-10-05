"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App919Controller = void 0;
const index_1 = require("../../../index");
const handle_curd_1 = require("../../../lib/handle.curd");
const App917_controller_1 = require("../App917/App917.controller");
const App919_enity_1 = require("./App919.enity");
let App919Controller = class App919Controller extends index_1.HandleController {
    async a1() { }
    async fundCurd() { }
};
__decorate([
    (0, index_1.Get)("/a1")
], App919Controller.prototype, "a1", null);
__decorate([
    (0, handle_curd_1.Curd)("/fund", App919_enity_1.Fund_Star, App917_controller_1.coon)
], App919Controller.prototype, "fundCurd", null);
App919Controller = __decorate([
    (0, index_1.Controller)("/app919")
], App919Controller);
exports.App919Controller = App919Controller;
//# sourceMappingURL=App919.controller.js.map