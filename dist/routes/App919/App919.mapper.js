"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App919Mapper = void 0;
const ado_node_1 = require("ado-node");
const App917_mapper_1 = require("../App917/App917.mapper");
let App919Mapper = class App919Mapper {
    getList() { }
};
__decorate([
    (0, ado_node_1.Select)("select * from user")
], App919Mapper.prototype, "getList", null);
App919Mapper = __decorate([
    (0, ado_node_1.Mapper)(),
    (0, ado_node_1.Connect)(App917_mapper_1.coon)
], App919Mapper);
exports.App919Mapper = App919Mapper;
//# sourceMappingURL=App919.mapper.js.map