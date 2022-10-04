"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const App919_controller_1 = require("./App919/App919.controller");
const App917_controller_1 = require("./App917/App917.controller");
exports.options = {
    controller: [App917_controller_1.App917Controller, App919_controller_1.App919Controller],
    base: "/api",
    port: 3000,
    staticDist: "dist/app",
};
//# sourceMappingURL=index.js.map