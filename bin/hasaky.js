#!/usr/bin/env node

/**
 * 快速发布命令并且更新迭代版本
 */
const { spawn, spawnSync } = require("child_process");
const program = require("commander");
const { nextTick } = require("process");
const inquirer = require('inquirer')


program
  .version("1.0.0")
  .command("commit")
  .description("描述git 提交的信息 与 NPM 版本是否上传")
  .action(async function () {
    const {commit_message,is_update_version} = await inquirer.prompt(getQuestions());

    if(is_update_version){

    }else{
      spawnSync("git add .",{
        stdio: "pipe",
        shell: true,
        env: process.env,
      })
      spawnSync(`git commit -m "${commit_message}"`,{
        stdio: "pipe",
        shell: true,
        env: process.env,
      })
      spawnSync("git push",{
        stdio: "pipe",
        shell: true,
        env: process.env,
      })
    }


    // console.log('questions',questions);
  });


function getQuestions(){
  return [{
    type: 'input',
    name: 'commit_message',
    message: 'commit message',
  },{
    type: 'list',
    name: 'is_update_version',
    message: 'is update version?',
    default: false,
    choices: [
      { name: 'yes', value: true },
      { name: 'no', value: false },
    ]        
  }] 
}


program.parse(process.argv);
