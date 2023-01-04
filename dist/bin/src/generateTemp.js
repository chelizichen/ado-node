// generateTemp.js 用于 生成 node.js 路由模版

const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const assert = require('assert');
const ejs = require('ejs');
const exec = require('child_process').exec;
const chalk = require("chalk")

/**
 * 
 * @param {string} templateName 生成的文件名
 * @param {string} generatePath 命令执行的位置
 */

let templateArray = [
  "controller",
  "entity",
  "module",
  "service"
]

async function generateTemplate(templateName, generatePath) {
  let templateFilePath = path.join(__dirname, './template');
  let newGeneratePath = generatePath + "/" + templateName
  let isPathExist = await fse.pathExists(newGeneratePath)
  if (isPathExist) {
    console.log(chalk.yellow("相关目录已存在"))
    return
  } else {
    fs.mkdirSync(newGeneratePath)
    console.log(chalk.green('生成目录',newGeneratePath));
  }
  templateArray.forEach(el => {
    let tempPath = templateFilePath + "/" +"index." + el + ".ejs" // 模版路径
    let createFilePath = newGeneratePath + "/" + templateName + "." + el + ".ts" // 生成文件路径
    let fileStr = fs.readFileSync(tempPath).toString()
    let renderFileStr = ejs.render(fileStr, {
      templateFileName:templateName
    })
    fs.writeFileSync(createFilePath,renderFileStr)
  })



}


module.exports = {
  generateTemplate
}