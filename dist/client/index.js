"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./css/index.css");
require("./less/index.less");
const index_vue_1 = __importDefault(require("./components/index.vue"));
const vue_1 = require("vue");
(0, vue_1.createApp)(index_vue_1.default).mount('#app');
console.log('hello wqorld');
//# sourceMappingURL=index.js.map