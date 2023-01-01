#!/usr/bin/env node

const program = require("commander")
const { ArcYaml } = require("./src/arc.js")

program.version('1.0.0')
  .command("generate <type>")
  .description("create a ado-node app")
  .action(function (type) {
    if (!type || type == undefined || Object.keys(type).length == 0) {
      console.log(chalk.red('异常：可能未输入目录名称'));
      return;
    }
    console.log(type);
    new ArcYaml()
  })


program.parse(process.argv);
