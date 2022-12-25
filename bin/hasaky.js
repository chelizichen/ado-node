#!/usr/bin/env node

const { spawn, spawnSync } = require("child_process");
const program = require("commander");


program
  .version("1.0.0")
  .command("commit <description>")
  .description("描述git 提交的信息")
  .action(function (description) {
    const add = spawnSync("git add .", {
      stdio: "pipe",
      shell: true,
      env: process.env,
    })

    add.stdout(function (chunk) {
      console.log("hasaky 执行命令(git add . )", chunk.toString());
    })
    add.stderr(function (chunk) {
      console.log("hasaky 执行命令(git add . )时出错", chunk.toString());
    })

    const commit = spawnSync(`git commit -m "${description}"`, {
      stdio: "pipe",
      shell: true,
      env: process.env,
    })

    commit.stdout(function (chunk) {
      console.log("hasaky 执行命令(git commit -m )", chunk.toString());
    })
    commit.stderr(function (chunk) {
      console.log("hasaky 执行命令(git commit -m )时出错", chunk.toString());
    })


    const push = spawnSync(`git push`, {
      stdio: "pipe",
      shell: true,
      env: process.env,
    })
    push.stdout(function (chunk) {
      console.log("hasaky 执行命令(git push)", chunk.toString());
    })
    push.stderr(function (chunk) {
      console.log("hasaky 执行命令(git push)时出错", chunk.toString());
    })

  });