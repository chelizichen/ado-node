#!/usr/bin/env node

const program = require("commander")
const fs = require('fs');
const fse = require('fs-extra');

// 得到当前命令执行目录
const generatePath = process.cwd()

const generateTemplate = require("./src/generateTemp").generateTemplate
const createAdoNodeApp = require("./src/createApp").createAdoNodeApp
// 创建模版
program.version('1.0.0')
  .option("-g, --GenerateTemplateName <template-name>")
  .description("create a ado-node router template")
  .action(function (appName) {
    
    if (!appName || appName == undefined || Object.keys(appName).length == 0) {
      console.log('异常：未输入目录名称');
      return;
    }

    if (typeof appName == "string") {
      generateTemplate(appName,generatePath)
    } else {
      generateTemplate(appName.GenerateTemplateName,generatePath)
    }
  })

// 创建项目
program.version('1.0.0')
  .command("create <app-name>")
  .description("create a ado-node app")
  .action(function (appName) {
    if (!appName || appName == undefined || Object.keys(appName).length == 0) {
      console.log('异常：未输入目录名称');
      return;
    }
    createAdoNodeApp(appName,generatePath)
  })






program.parse(process.argv);
