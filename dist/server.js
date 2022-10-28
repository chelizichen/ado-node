"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_Module_1 = require("./routes/App/App.Module");
const ado_node_1 = require("ado-node");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
let NodeServer = class NodeServer extends ado_node_1.AdoNodeServer {
};
NodeServer = __decorate([
    (0, ado_node_1.Modules)({
        Modules: [App_Module_1.AppModule],
        Port: 3001,
        Base: "",
        GlobalPipes: [],
    })
], NodeServer);
NodeServer.runSSRServer((app) => {
    app.set("views", path_1.default.join(__dirname, "views"));
    app.set("view engine", "ejs");
    const assets = express_1.default.static(path_1.default.join(__dirname, "../public"));
    app.use("/ado", assets);
    app.set("trust proxy", function (ip) {
        console.log(ip);
        return false;
    });
    app.listen(3001, () => {
        console.log("3001 listen");
    });
});
//# sourceMappingURL=server.js.map