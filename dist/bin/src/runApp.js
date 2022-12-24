"use strict";
const { spawn } = require("child_process");
function runViteApp() {
    const currProcess = spawn("vite", {
        stdio: "pipe",
        shell: true,
        env: process.env,
    });
    currProcess.stdout.on("data", function (chunk) {
        console.log('vite 客户端', new Date(), chunk.toString());
    });
    currProcess.stdout.on("error", function (chunk) {
        console.log('错误！！！： vite 客户端运行输出', new Date(), chunk.toString());
    });
}
function runNodeApp() {
    const currProcess = spawn("ts-node-dev --project tsconfig.server.json src/index.ts", {
        stdio: "pipe",
        shell: true,
        env: process.env,
    });
    currProcess.stdout.on("data", function (chunk) {
        console.log('node 服务端', new Date(), chunk.toString());
    });
    currProcess.stdout.on("error", function (chunk) {
        console.log('错误！！！： node 服务端运行输出', new Date(), chunk.toString());
    });
}
function buildViteApp() {
    const currProcess = spawn("vite build", {
        stdio: "pipe",
        shell: true,
        env: process.env,
    });
    currProcess.stdout.on("data", function (chunk) {
        console.log('vite 客户端打包输出', new Date(), chunk.toString());
    });
    currProcess.stdout.on("error", function (chunk) {
        console.log('错误！！！： vite 客户端打包输出', new Date(), chunk.toString());
    });
}
function buildNodeApp() {
    const currProcess = spawn("tsc --project tsconfig.server.json", {
        stdio: "pipe",
        shell: true,
        env: process.env,
    });
    currProcess.stdout.on("data", function (chunk) {
        console.log('node 服务端打包输出', new Date(), chunk.toString());
    });
    currProcess.stdout.on("error", function (chunk) {
        console.log('错误！！！： node 服务端打包输出', new Date(), chunk.toString());
    });
}
module.exports = {
    runViteApp,
    runNodeApp,
    buildViteApp,
    buildNodeApp
};
//# sourceMappingURL=runApp.js.map