"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App917Controller = exports.coon = void 0;
const handle_class_1 = require("../../../lib/handle.class");
const handle_controller_1 = require("../../../lib/handle.controller");
const handle_curd_1 = require("../../../lib/handle.curd");
const handle_inject_1 = require("../../../lib/handle.inject");
const handle_method_1 = require("../../../lib/handle.method");
const handle_pipe_1 = require("../../../lib/handle.pipe");
const App917_enity_1 = require("./App917.enity");
const App917_pipe_1 = require("./App917.pipe");
const App917_service_1 = require("./App917.service");
const mysql = __importStar(require("mysql"));
const config = {
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "boot",
    port: "3306",
};
exports.coon = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    multipleStatements: true,
});
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
        const data = await this.App917Service.a1();
        return App917_enity_1.Ret.Message(0, "ok", data);
    }
    async CurdUser() { }
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
__decorate([
    (0, handle_curd_1.Curd)("/user", App917_enity_1.user, exports.coon)
], App917Controller.prototype, "CurdUser", null);
App917Controller = __decorate([
    (0, handle_controller_1.Controller)("/app917")
], App917Controller);
exports.App917Controller = App917Controller;
//# sourceMappingURL=App917.controller.js.map