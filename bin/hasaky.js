#!/usr/bin/env node

const { spawn, spawnSync } = require("child_process");
const program = require("commander");
const { nextTick } = require("process");


program
  .version("1.0.0")
  .command("commit <description>")
  .description("描述git 提交的信息")
  .action(function (description) {
    const add = spawn("git add .", {
      stdio: "pipe",
      shell: true,
      env: process.env,
    })

    add.stdout.on("data",function (chunk) {
      console.log("hasaky 执行命令(git add . )", chunk.toString());
    })
    add.stderr.on("data",function (chunk) {
      console.log("hasaky 执行命令(git add . )时出错", chunk.toString());
    })

    nextTick(() => {
      const commit = spawn(`git commit -m "${description}"`, {
        stdio: "pipe",
        shell: true,
        env: process.env,
      })

      commit.stdout.on("data",function (chunk) {
        console.log("hasaky 执行命令(git commit -m )", chunk.toString());
      })
      commit.stderr.on("data",function (chunk) {
        console.log("hasaky 执行命令(git commit -m )时出错", chunk.toString());
      })
    })

    setTimeout(() => {
      const push = spawn(`git push`, {
        stdio: "pipe",
        shell: true,
        env: process.env,
      })
      push.stdout.on("data",function (chunk) {
        console.log("hasaky 执行命令(git push)", chunk.toString());
      })
      push.stderr.on("data",function (chunk) {
        console.log("hasaky 执行命令(git push)时出错", chunk.toString());
      })
    },0)

  });


program.parse(process.argv);
