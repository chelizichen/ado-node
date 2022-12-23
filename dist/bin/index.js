#!/usr/bin/env node
"use strict";
const program = require("commander");
const fs = require('fs');
const fse = require('fs-extra');
// 得到当前命令执行目录
const generatePath = process.cwd();
const generateTemplate = require("./src/generateTemp").generateTemplate;
const createAdoNodeApp = require("./src/createApp").createAdoNodeApp;
// 创建模版
program.version('1.0.0')
    .option("-g, --GenerateTemplateName <template-name>")
    .description("create a ado-node router template")
    .action(function (appName) {
    if (typeof appName == "string") {
        generateTemplate(appName, generatePath);
    }
    else {
        generateTemplate(appName.GenerateTemplateName, generatePath);
    }
});
// 创建项目
program.version('1.0.0')
    .command("create <app-name>")
    .description("create a ado-node app")
    .action(function (appName) {
    createAdoNodeApp(appName, generatePath);
});
program.version('1.0.0')
    .command("run-ssr <args>")
    .description("run ado-node-ssr app")
    .action(function (appName) {
});
program.version('1.0.0')
    .command("run-node <args>")
    .description("run ado-node app")
    .action(function (appName) {
});
program.parse(process.argv);
//# sourceMappingURL=index.js.map