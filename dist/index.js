"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
const ado_node_1 = require("ado-node");
const app = (0, express_1.default)();
const { controller, base } = routes_1.options;
controller.forEach((el) => {
    const router = ado_node_1.ref.get(el);
    app.use(base, router);
});
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
let scriptPath;
let staticPath;
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
if (process.env.NODE_ENV !== "development") {
    scriptPath = "/js/main.js";
    staticPath = "./static";
}
else {
    scriptPath = "http://localhost:3001/dist/static/js/main.js";
    staticPath = "./dist/static";
}
app.use(express_1.default.static(path_1.default.resolve(__dirname, staticPath)));
app.get("*", function (req, res) {
    res.render("index", {
        msg: "HELLO WORLD EJS",
        scriptPath,
    });
});
app.listen(3000, function () {
    console.log("3000 listen");
});
//# sourceMappingURL=index.js.map