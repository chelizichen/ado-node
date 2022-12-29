"use strict";
const { spawn, spawnSync } = require("child_process");
const chalk = require("chalk");
const fs = require("fs");
const path = require('path');
const os = require("os");
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
    let tgzServerPath = `.ado_cache/${tgzName}`;
    let cachedir = ".ado_cache";
    let node_modules_cache = ".ado_cache/cache_modules.tgz";
    let server_cache = ".ado_cache/ado_server.tgz";
    let nodeModulesDir = "node_modules";
    let pkgPath = "package.json";
    let distPath = "dist";
    let publicPath = "public";
    let hasCacheDir = fs.existsSync(cachedir);
    let hasCacheModules = fs.existsSync(cachedir);
    let hasPublicDir = fs.existsSync(publicPath);
    function winOrForceTgz() {
        const server_cmd = `tar -zcvf ${tgzServerPath} ${distPath} ${pkgPath} ${nodeModulesDir} ${publicPath}`;
        console.log(server_cmd);
        spawnSync(server_cmd, {
            stdio: "inherit",
            shell: true,
            env: process.env,
        });
    }
    // 创建目录文件
    if (!hasCacheDir) {
        fs.mkdirSync(cachedir);
    }
    if (!hasPublicDir) {
        fs.mkdirSync(publicPath);
    }
    winOrForceTgz();
    return;
    if (os.platform == "win32") {
        winOrForceTgz();
        console.log("Windows 版本下的 tgz 的合并有问题");
        return;
    }
    // 强制刷新缓存
    if (opt.force) {
        const cmd = `tar -zcvf ${node_modules_cache} ${nodeModulesDir}`;
        spawnSync(cmd, {
            stdio: "inherit",
            shell: true,
            env: process.env,
        });
    }
    const server_cmd = `tar -zcvf ${server_cache} ${distPath} ${pkgPath} ${publicPath}`;
    spawnSync(server_cmd, {
        stdio: "inherit",
        shell: true,
        env: process.env,
    });
    streamMerge(cachedir, tgzServerPath);
    // 执行合并
    // const merge_cmd = `cat ${server_cache}  ${node_modules_cache} > ${tgzServerPath}`
    // spawnSync(merge_cmd, {
    //   stdio: "inherit",
    //   shell: true,
    //   env: process.env    
    // })
}
/**
 * Stream 合并
 * @param { String } sourceFiles 源文件目录名
 * @param { String } targetFile 目标文件
 */
function streamMerge(sourceFiles, targetFile) {
    const scripts = fs.readdirSync(sourceFiles).map(el => ".ado_cache/" + el).filter(el => el != targetFile); // 获取源文件目录下的所有文件
    const fileWriteStream = fs.createWriteStream(targetFile); // 创建一个可写流
    console.log(scripts);
    streamMergeRecursive(scripts, fileWriteStream);
}
/**
 * Stream 合并的递归调用
 * @param { Array } scripts
 * @param { Stream } fileWriteStream
 */
function streamMergeRecursive(scripts = [], fileWriteStream) {
    // return new Promise
    // 递归到尾部情况判断
    if (!scripts.length) {
        console.log("合并完成");
        console.log("如果需要使用 node_modules 强制刷新缓存，可以使用");
        console.log(chalk.blue(' npm run release -- -f '));
        return fileWriteStream.end("console.log('Stream 合并完成')"); // 最后关闭可写流，防止内存泄漏
    }
    const currentFile = scripts.shift();
    const currentReadStream = fs.createReadStream(currentFile); // 获取当前的可读流
    currentReadStream.pipe(fileWriteStream, { end: false });
    currentReadStream.on('end', function () {
        streamMergeRecursive(scripts, fileWriteStream);
    });
    currentReadStream.on('error', function (error) {
        console.error(error);
        fileWriteStream.close();
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