"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const User_Module_1 = require("./../User/User.Module");
const Star_Module_1 = require("./../Star/Star.Module");
const App_Controller_1 = require("./App.Controller");
const ado_node_1 = require("ado-node");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, ado_node_1.Module)({
        Controller: [App_Controller_1.AppController],
        Provider: [Star_Module_1.StarModule, User_Module_1.UserModule],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=App.Module.js.map