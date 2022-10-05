"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App917Mapper = void 0;
const handle_mapper_1 = require("../../../lib/handle.mapper");
const App917_controller_1 = require("./App917.controller");
/**
 * @Mapper 数据库操作层
 * @Connect 数据库链接
 * @Select 用于提示sql
 */
let App917Mapper = class App917Mapper {
    async userList(_options) { }
    async update() { }
};
__decorate([
    (0, handle_mapper_1.Select)(`select * from  user where id = ? `)
], App917Mapper.prototype, "userList", null);
__decorate([
    (0, handle_mapper_1.Update)(``)
], App917Mapper.prototype, "update", null);
App917Mapper = __decorate([
    (0, handle_mapper_1.Mapper)(),
    (0, handle_mapper_1.Connect)(App917_controller_1.coon)
], App917Mapper);
exports.App917Mapper = App917Mapper;
//# sourceMappingURL=App917.mapper.js.map