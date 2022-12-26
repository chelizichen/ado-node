#!/usr/bin/env node
"use strict";
const program = require("commander");
const fs = require("fs");
const fse = require("fs-extra");
const { runViteApp, runNodeApp, buildNodeApp, buildViteApp, } = require("./src/runApp.js");
const chalk = require("chalk");
// 得到当前命令执行目录
const generatePath = process.cwd();
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
});
program
    .version("1.0.0")
    .command("run-node")
    .description("run ado-node app")
    .action(function (appName) {
    runNodeApp();
});
program
    .version("1.0.0")
    .command("build-node")
    .description("build ado-node app")
    .action(function (appName) {
    buildNodeApp();
});
program
    .version("1.0.0")
    .command("build-ssr <args>")
    .description("build ado-node-ssr app")
    .action(function (appName) {
    if (args == "vite") {
        buildNodeApp();
        buildViteApp();
    }
});
program.parse(process.argv);
//# sourceMappingURL=dev.js.map