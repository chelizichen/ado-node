#!/usr/bin/env node

const program = require("commander")
const fs = require('fs');
const fse = require('fs-extra');

// 得到当前命令执行目录
const generatePath = process.cwd()

const generateTemplate = require("./src/generateTemp").generateTemplate

// 创建模版
program.version('1.0.0')
  .option("-g, --GenerateTemplateName <template-name>")
  .description("create a ado-node router template")
  .action(function (appName) {

    if (typeof appName == "string") {
      generateTemplate(appName,generatePath)
    } else {
      generateTemplate(appName.GenerateTemplateName,generatePath)
    }
  })

// 创建项目
program.version('1.0.0')
  .option("-c,--createAppName <app-name>")
  .command("create <app-name>")
  .description("create a ado-node app")
  .action(function (appName) {
    console.log(appName);
  })

program.parse(process.argv);
