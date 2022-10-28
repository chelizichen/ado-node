"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const ado_node_1 = require("ado-node");
const User_Service_1 = require("./User.Service");
let UserController = class UserController extends ado_node_1.AdoNodeController {
    UserService;
    hello() {
        return {
            data: "hello world",
            code: 0,
        };
    }
};
__decorate([
    (0, ado_node_1.Inject)(User_Service_1.UserService)
], UserController.prototype, "UserService", void 0);
__decorate([
    (0, ado_node_1.Get)("")
], UserController.prototype, "hello", null);
UserController = __decorate([
    (0, ado_node_1.Controller)("/user")
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=User.Controller.js.map