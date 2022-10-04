"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App917Service = void 0;
const handle_inject_1 = require("../../../lib/handle.inject");
const App917_mapper_1 = require("./App917.mapper");
let App917Service = class App917Service {
    App917Mapper;
    async a1() {
        const opt = ["19"];
        const ret = await this.App917Mapper.userList(opt);
        return ret;
    }
};
__decorate([
    (0, handle_inject_1.Inject)(App917_mapper_1.App917Mapper)
], App917Service.prototype, "App917Mapper", void 0);
App917Service = __decorate([
    (0, handle_inject_1.Collect)()
], App917Service);
exports.App917Service = App917Service;
//# sourceMappingURL=App917.service.js.map