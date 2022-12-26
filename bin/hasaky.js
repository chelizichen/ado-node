#!/usr/bin/env node

/**
 * 快速发布命令并且更新迭代版本
 */

const { spawn, spawnSync } = require("child_process");
const program = require("commander");
const { nextTick } = require("process");
const inquirer = require("inquirer");
const path = require('path')
const chalk = require("chalk");
const { writeFileSync } = require("fs");

const packageJsonPath = path.join(process.cwd() + "/package.json")
const testPath = path.join(process.cwd() + "/test.json")

program
  .version("1.0.0")
  .command("commit")
  .description("描述git 提交的信息 与 NPM 版本是否上传")
  .action(async function () {
    const { commit_message, is_update_version } = await inquirer.prompt(
      getQuestions()
    );
    
    if (is_update_version) {
      const { update_version } = await inquirer.prompt(getNpmQuestions())
      updatePackageJson(update_version)

      runGitHooks(commit_message);
    } else {
      runGitHooks(commit_message);
    }

  });

async function runGitHooks(commit_message) {
  const add_HOOKS_result = spawnSync("git add .", {
    stdio: "inherit",
    shell: true,
    env: process.env,
  });

  if (add_HOOKS_result.status !== 0) {
    process.stderr.write(add_HOOKS_result.stderr);
    process.exit(add_HOOKS_result.status);
  }

  const commit_HOOKS_result = spawnSync(`git commit -m "${commit_message}"`, {
    stdio: "inherit",
    shell: true,
    env: process.env,
  });

  if (commit_HOOKS_result.status !== 0) {
    process.stderr.write(commit_HOOKS_result.stderr);
    process.exit(commit_HOOKS_result.status);
  }

  const push_HOOKS_result = spawnSync("git push", {
    stdio: "inherit",
    shell: true,
    env: process.env,
  });

  if (push_HOOKS_result.status !== 0) {
    process.stderr.write(push_HOOKS_result.stderr);
    process.exit(push_HOOKS_result.status);
  }
}

function getQuestions() {
  return [
    {
      type: "input",
      name: "commit_message",
      message: "commit message",
    },
    {
      type: "list",
      name: "is_update_version",
      message: "is update version?",
      default: false,
      choices: [
        { name: "yes", value: true },
        { name: "no", value: false },
      ],
    },
  ];
}


function getNpmQuestions() {

  let currVersion = require(packageJsonPath)
  let after_add_version = addVersion(currVersion.version)

  console.log(chalk.green("curr package version is ->>> ", currVersion.version));
  console.log(chalk.green("please input new version ->>>"));
  return [
    {
      type: "input",
      name: "update_version",
      message: "update version? ",
      default: after_add_version,
    },
  ];
}

function updatePackageJson(update_version) {
  let currVersion = require(packageJsonPath)
  currVersion.version = update_version
  writeFileSync(packageJsonPath, JSON.stringify(currVersion, null, 2))
  spawn("npm run build", {
    stdio: "inherit",
    shell: true,
    env: process.env,
  })
}

/** 
 * npm 版本号迭代测试 日期 2022 12.26
 * 测试 2.4.9 预期 2.5.0 成功
 * 测试 0.0.9 预期 0.1.0 成功
 * 测试 0.0.1 预期 0.0.2 成功
 * 测试 0.9.9 预期 1.0.0 成功
*/

function addVersion(currVersion) {
  // 得到默认增加后的版本号
  let _currVersion = Number(currVersion.replaceAll(".", "")) + 1
  _currVersion = String(_currVersion)

  // 判断是否为0 开头

  if (_currVersion.length == 1) {
    _currVersion = "00" + _currVersion
  }

  if (_currVersion.length == 2) {
    _currVersion = "0" + _currVersion
  }

  _currVersion = _currVersion.split("").join(".")

  return _currVersion

  // // 判断大版本号是否 >= 10
  // if (_currVersion.length >= 4) {

  // }

}

program.parse(process.argv);
