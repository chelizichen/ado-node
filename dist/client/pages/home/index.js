"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePage = void 0;
const react_1 = __importDefault(require("react"));
require("./index.css");
const ado_png_1 = __importDefault(require("../../assets/ado.png"));
function HomePage() {
    let msg = "react ejs app";
    return (<div>
      <div className="logo">
        <img src={ado_png_1.default} id="logo"/>
        <a href="https://github.com/chelizichen/ado-cli">ado-app</a>
      </div>
      <div className="dev">
        <div>SSR App With {msg}</div>
        <div>Build By Webpack5</div>
      </div>
    </div>);
}
exports.HomePage = HomePage;
//# sourceMappingURL=index.js.map