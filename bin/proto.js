#!/usr/bin/env node

const program = require("commander")
const { ArcYaml } = require("./src/arc.js")

program.version('1.0.0')
  .command("generate <type>")
  .description("create rpc file")
  .action(function (type) {
    if (!type || type == undefined || Object.keys(type).length == 0) {
      console.log(chalk.red('异常：可能服务名称'));
      return;
    }
    if(type != "server" && type != "client"){
      console.log("未输入生成文件类型- 请输入 server client ");
      return;
    }
    console.log(type);
    const arcyaml = new ArcYaml()
    arcyaml.createTemplate(type)
  })


program.parse(process.argv);
