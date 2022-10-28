"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const App_jsx_1 = __importDefault(require("./App.jsx"));
require("./style/index.css");
const root = client_1.default.createRoot(document.getElementById("app"));
root.render(<App_jsx_1.default />);
//# sourceMappingURL=index.js.map