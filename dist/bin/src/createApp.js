"use strict";
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const assert = require('assert');
const ejs = require('ejs');
const exec = require('child_process').exec;
const inquirer = require('inquirer');
function exists(path) {
    return fs.existsSync(path) || path.existsSync(path);
}
function isFile(path) {
    return exists(path) && fs.statSync(path).isFile();
}
function isDir(path) {
    return exists(path) && fs.statSync(path).isDirectory();
}
/**
 *
 * @param {string} appName // 项目文件名
 * @param {string} appPath // 项目地址
 */
async function createAdoNodeApp(appName, appPath) {
    let createAppPath = appPath + "/" + appName;
    // 1 先判断目录有没有
    let isPathExist = await fse.pathExists(createAppPath);
    if (isPathExist) {
        console.log('目录已存在');
        return;
    }
    const questions = createQuestions();
    const answers = await inquirer.prompt(questions);
    const { template } = answers;
    // 得到模版路径
    const AppTemplatePath = path.resolve(__dirname, "./createAppTemplate" + "/" + template);
    const FilesDir = fs.readdirSync(AppTemplatePath);
    fs.mkdirSync(createAppPath);
    await copyByDir(FilesDir, AppTemplatePath, createAppPath);
}
function createQuestions() {
    const questions = [];
    questions.push({
        type: "list",
        name: "template",
        message: "请选择项目模版",
        choices: [
            "ado-node",
            "ado-node-vue-ssr(vite)",
            "ado-node-react-ssr(vite)"
        ],
    });
    return questions;
}
async function copyByDir(filesDir, templatePath, appPath) {
    filesDir.forEach(async (el) => {
        let _path = templatePath + "/" + el;
        let _isDir = isDir(_path);
        let _appPath = appPath + "/" + el;
        if (_isDir) {
            fs.mkdirSync(_appPath);
            const FilesDir = fs.readdirSync(_path);
            await copyByDir(FilesDir, _path, _appPath);
        }
        else {
            _appPath = _appPath.replace(".ejs", ".ts");
            await fs.copyFileSync(_path, _appPath);
        }
    });
}
module.exports = {
    createAdoNodeApp
};
//# sourceMappingURL=createApp.js.map