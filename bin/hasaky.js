#!/usr/bin/env node

/**
 * 快速发布命令并且更新迭代版本
 */

const { spawn, spawnSync } = require("child_process");
const program = require("commander");
const { nextTick } = require("process");
const inquirer = require("inquirer");
const path = require("path");
const chalk = require("chalk");
const { writeFileSync, copyFile } = require("fs");
const fs = require("fs");
const fs_ext = require("fs-extra");
const packageJsonPath = path.join(process.cwd() + "/package.json");
const testPath = path.join(process.cwd() + "/test.json");

const cwd = process.cwd();

program
  .version("1.0.0")
  .command("commit")
  .description("描述git 提交的信息 与 NPM 版本是否更新")
  .action(async function () {
    const { commit_message, is_update_version } = await inquirer.prompt(
      getQuestions()
    );
    if (is_update_version) {
      const { update_version } = await inquirer.prompt(getNpmQuestions());
      const isUpdate = await updatePackageJson(update_version);
      if (isUpdate) {
        runGitHooks(commit_message);
      }
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
  let currVersion = require(packageJsonPath);
  let after_add_version = addVersion(currVersion.version);

  console.log(
    chalk.green("curr package version is ->>> ", currVersion.version)
  );
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
  let dirNum = 2;
  let currDirNum = 0;
  return new Promise((resolve, reject) => {
    let currVersion = require(packageJsonPath);
    currVersion.version = update_version;
    writeFileSync(packageJsonPath, JSON.stringify(currVersion, null, 2));
    spawnSync("npm run build", {
      stdio: "inherit",
      shell: true,
      env: process.env,
    });

    const sourPath1 = cwd + "/bin/src/createAppTemplate";
    const targetPath1 = cwd + "/dist/bin/src/createAppTemplate";
    const sourPath2 = cwd + "/bin/src/template";
    const targetPath2 = cwd + "/dist/bin/src/template";
    fs.mkdirSync(targetPath1);
    fs.mkdirSync(targetPath2);

    fs_ext.copy(sourPath1, targetPath1, function (err) {
      if (err) {
        console.log("An error occured while copying the folder.");
        return console.error(err);
      }
      console.log("Copy completed!");
      currDirNum++;
      if (currDirNum == dirNum) {
        spawnSync("npm publish", {
          stdio: "inherit",
          shell: true,
          env: process.env,
        });
        resolve(true);
      }
    });

    fs_ext.copy(sourPath2, targetPath2, function (err) {
      if (err) {
        console.log("An error occured while copying the folder.");
        return console.error(err);
      }
      console.log("Copy completed!");
      currDirNum++;
      if (currDirNum == dirNum) {
        spawnSync("npm publish", {
          stdio: "inherit",
          shell: true,
          env: process.env,
        });
        resolve(true);
      }
    });
  });
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
  let _currVersion = Number(currVersion.replaceAll(".", "")) + 1;
  _currVersion = String(_currVersion);

  // 判断是否为0 开头

  if (_currVersion.length == 1) {
    _currVersion = "00" + _currVersion;
  }

  if (_currVersion.length == 2) {
    _currVersion = "0" + _currVersion;
  }

  _currVersion = _currVersion.split("").join(".");

  return _currVersion;

  // // 判断大版本号是否 >= 10
  // if (_currVersion.length >= 4) {

  // }
}

program.parse(process.argv);
