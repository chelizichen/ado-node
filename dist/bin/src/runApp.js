"use strict";
const { spawn, spawnSync } = require("child_process");
const chalk = require("chalk");
const fs = require("fs");
function runViteApp() {
    const currProcess = spawn("vite", {
        stdio: "pipe",
        shell: true,
        env: process.env,
    });
    currProcess.stdout.on("data", function (chunk) {
        console.log(chalk.green("vite 客户端", new Date(), chunk.toString()));
    });
    currProcess.stderr.on("data", function (chunk) {
        console.log(chalk.red("错误！！！： vite 客户端运行输出", new Date(), chunk.toString()));
    });
}
function runNodeApp() {
    const currProcess = spawn("ts-node-dev --project tsconfig.server.json src/index.ts", {
        stdio: "pipe",
        shell: true,
        env: process.env,
    });
    currProcess.stdout.on("data", function (chunk) {
        console.log(chalk.blue("node 服务端", new Date(), chunk.toString()));
    });
    currProcess.stderr.on("data", function (chunk) {
        console.log(chalk.red("错误！！！： node 服务端运行输出", new Date(), chunk.toString()));
    });
}
function buildViteApp() {
    const currProcess = spawn("vite build", {
        stdio: "pipe",
        shell: true,
        env: process.env,
    });
    currProcess.stdout.on("data", function (chunk) {
        console.log(chalk.green("vite 客户端打包输出", new Date(), chunk.toString()));
    });
    currProcess.stderr.on("data", function (chunk) {
        console.log(chalk.red("错误！！！： vite 客户端打包输出", new Date(), chunk.toString()));
    });
}
function buildNodeApp() {
    const currProcess = spawn("tsc --project tsconfig.server.json", {
        stdio: "pipe",
        shell: true,
        env: process.env,
    });
    currProcess.stdout.on("data", function (chunk) {
        console.log(chalk.green("node 服务端打包输出", new Date(), chunk.toString()));
    });
    currProcess.stderr.on("data", function (chunk) {
        console.log(chalk.red("错误！！！： node 服务端打包输出", new Date(), chunk.toString()));
    });
}
function previewNodeApp() {
    const currProcess = spawn("node dist/src/index.js", {
        stdio: "inherit",
        shell: true,
        env: process.env,
    });
}
function previewViteApp() {
    const currProcess = spawn("vite preview", {
        stdio: "inherit",
        shell: true,
        env: process.env,
    });
}
function runBuildApp() {
    return new Promise((resolve) => {
        spawnSync("npm run ", ["build"], {
            stdio: "inherit",
            shell: true,
            env: process.env,
        });
        resolve();
    });
}
// cat server.tgz  cache_modules.tgz > merge.tgz
function createTgz(tgzName, opt) {
    let cwd = process.cwd();
    let tgzServerPath = cwd + `/.ado_cache/${tgzName}`;
    let cachedir = cwd + "/.ado_cache";
    let node_modules_cache = cwd + "/.ado_cache/cache_modules.tgz";
    let server_cache = cwd + "/.ado_cache/ado_server.tgz";
    let nodeModulesDir = cwd + "/node_modules";
    let pkgPath = cwd + "/package.json";
    let distPath = cwd + "/dist";
    let publicPath = cwd + "/public";
    let hasCacheDir = fs.existsSync(cachedir);
    let hasCacheModules = fs.existsSync(cachedir);
    // 创建目录文件
    if (!hasCacheDir) {
        fs.mkdirSync(cachedir);
        const server_cmd = `tar -cvf ${tgzServerPath} ${distPath} ${pkgPath} ${nodeModulesDir} ${publicPath}`;
        spawnSync(server_cmd, {
            stdio: "inherit",
            shell: true,
            env: process.env,
        });
        return;
    }
    // 强制刷新缓存
    if (opt.force) {
        const cmd = `tar -cvf ${node_modules_cache} ${nodeModulesDir}`;
        spawnSync(cmd, {
            stdio: "inherit",
            shell: true,
            env: process.env,
        });
    }
    const server_cmd = `tar -cvf ${server_cache} ${distPath} ${pkgPath} ${publicPath}`;
    spawnSync(server_cmd, {
        stdio: "inherit",
        shell: true,
        env: process.env,
    });
    // 执行合并
    const merge_cmd = `cat ${server_cache}  ${node_modules_cache} > ${tgzServerPath}`;
    spawnSync(merge_cmd, {
        stdio: "inherit",
        shell: true,
        env: process.env
    });
}
module.exports = {
    runViteApp,
    runNodeApp,
    buildViteApp,
    buildNodeApp,
    previewNodeApp,
    previewViteApp,
    createTgz,
    runBuildApp,
};
//# sourceMappingURL=runApp.js.map