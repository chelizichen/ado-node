const { spawn } = require("child_process");
const chalk = require("chalk")

function runViteApp() {
  const currProcess = spawn("vite", {
    stdio: "pipe",
    shell: true,
    env: process.env,
  });
  currProcess.stdout.on("data", function (chunk) { 
    console.log(chalk.green('vite 客户端',new Date(),chunk.toString()));
  })
  currProcess.stderr.on("data", function (chunk) {
    console.log(chalk.red('错误！！！： vite 客户端运行输出',new Date(),chunk.toString()));
  })
}

function runNodeApp() {
  const currProcess = spawn("ts-node-dev --project tsconfig.server.json src/index.ts", {
    stdio: "pipe",
    shell: true,
    env: process.env,
  })

  currProcess.stdout.on("data", function (chunk) { 
    console.log(chalk.blue('node 服务端',new Date(),chunk.toString()));
  })

  currProcess.stderr.on("data", function (chunk) {
    console.log(chalk.red('错误！！！： node 服务端运行输出',new Date(),chunk.toString()));
  })
}

function buildViteApp() {
  const currProcess = spawn("vite build", {
    stdio: "pipe",
    shell: true,
    env: process.env,
  });
  currProcess.stdout.on("data", function (chunk) { 
    console.log(chalk.green('vite 客户端打包输出',new Date(),chunk.toString()));
  })
  currProcess.stderr.on("data", function (chunk) {
    console.log(chalk.red('错误！！！： vite 客户端打包输出',new Date(),chunk.toString()));
  })
  
}

function buildNodeApp() {
  const currProcess = spawn("tsc --project tsconfig.server.json", {
    stdio: "pipe",
    shell: true,
    env: process.env,
  })

  currProcess.stdout.on("data", function (chunk) { 
    console.log(chalk.green('node 服务端打包输出',new Date(),chunk.toString()));
  })

  currProcess.stderr.on("data", function (chunk) {
    console.log(chalk.red('错误！！！： node 服务端打包输出',new Date(),chunk.toString()));
  })
}


module.exports = {
  runViteApp,
  runNodeApp,
  buildViteApp,
  buildNodeApp
};
