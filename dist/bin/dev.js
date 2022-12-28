#!/usr/bin/env node
"use strict";
const program = require("commander");
const fs = require("fs");
const fse = require("fs-extra");
const { runViteApp, runNodeApp, buildNodeApp, buildViteApp, previewNodeApp, previewViteApp, createTgz, runBuildApp } = require("./src/runApp.js");
const chalk = require("chalk");
// 得到当前命令执行目录
const generatePath = process.cwd();
/**
 * @description 运行 Ado-Node SSR 的服务
 */
program
    .version("1.0.0")
    .command("run-ssr <args>")
    .description("run ado-node-ssr app")
    .action(function (args) {
    console.log("运行方式", args);
    if (args == "vite") {
        runViteApp();
        runNodeApp();
    }
    if (args == "webpack") {
        console.log(args);
    }
});
/**
 * @description 运行 Ado-Node 的服务
 */
program
    .version("1.0.0")
    .command("run-node")
    .description("run ado-node app")
    .action(function (appName) {
    runNodeApp();
});
/**
 * @description 打包 Ado-Node 的服务
 */
program
    .version("1.0.0")
    .command("build-node")
    .description("build ado-node app")
    .action(function () {
    buildNodeApp();
});
/**
 * @description 打包 Ado-Node  SSR 的服务
 */
program
    .version("1.0.0")
    .command("build-ssr <args>")
    .description("build ado-node-ssr app")
    .action(function (args) {
    if (args == "vite") {
        buildNodeApp();
        buildViteApp();
    }
});
/**
 * @description 预览 Ado-Node  的服务
 */
program
    .version("1.0.0")
    .command("preview <args>")
    .description("preview ado-node-ssr app")
    .action(function (args) {
    if (args == "vite") {
        previewNodeApp();
        previewViteApp();
    }
    if (args == "node") {
        previewNodeApp();
    }
});
// npm run build && tar -cvf AdoTest001.tgz ./dist package.json node_modules
program
    .version("1.0.0")
    .command("release  <appName>")
    .description("build and release ado-node app")
    .action(function (appName) {
    runBuildApp().then(() => {
        createTgz(appName);
    });
});
program.parse(process.argv);
//# sourceMappingURL=dev.js.map