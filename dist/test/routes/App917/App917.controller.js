"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App917Controller = void 0;
const handle_class_1 = require("../../../lib/handle.class");
const handle_controller_1 = require("../../../lib/handle.controller");
const handle_inject_1 = require("../../../lib/handle.inject");
const handle_method_1 = require("../../../lib/handle.method");
const handle_pipe_1 = require("../../../lib/handle.pipe");
const App917_pipe_1 = require("./App917.pipe");
const App917_service_1 = require("./App917.service");
let App917Controller = class App917Controller extends handle_class_1.HandleController {
    App917Service;
    async a1() {
        const ret = await this.App917Service.a1();
        return {
            Msg: "测试中",
            Code: 0,
            ret,
        };
    }
    async b1(_req, _res) {
        const ret = await this.App917Service.a1();
        return {
            Msg: "测试中",
            Code: 0,
            ret,
        };
    }
    async c1(_req, _res) {
        const ret = await this.App917Service.a1();
        return {
            Msg: "测试中",
            Code: 0,
            ret,
        };
    }
};
__decorate([
    (0, handle_inject_1.Inject)(App917_service_1.App917Service)
], App917Controller.prototype, "App917Service", void 0);
__decorate([
    (0, handle_method_1.Get)("/a1")
], App917Controller.prototype, "a1", null);
__decorate([
    (0, handle_method_1.Get)("/b1"),
    (0, handle_pipe_1.Pipe)([App917_pipe_1.useIdPipe, App917_pipe_1.userNamePipe])
], App917Controller.prototype, "b1", null);
__decorate([
    (0, handle_method_1.Get)("/c1"),
    (0, handle_pipe_1.Pipe)(App917_pipe_1.useIdPipe)
], App917Controller.prototype, "c1", null);
App917Controller = __decorate([
    (0, handle_controller_1.Controller)("/app917")
], App917Controller);
exports.App917Controller = App917Controller;
//# sourceMappingURL=App917.controller.js.map