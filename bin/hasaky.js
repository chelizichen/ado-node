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
      const add_HOOKS_result = spawnSync("git add .",{
        stdio: "pipe",
        shell: true,
        env: process.env,
      })

      

      if(add_HOOKS_result.status !== 0){
        process.stderr.write(add_HOOKS_result.stderr);
        process.exit(add_HOOKS_result.status);
      }else{
        // console.log('git add 打印输出',process.stdout.write(add_HOOKS_result.stdout));
      }

      const commit_HOOKS_result = spawnSync(`git commit -m "${commit_message}"`,{
        stdio: "pipe",
        shell: true,
        env: process.env,
      })

      if(commit_HOOKS_result.status !== 0){
        process.stderr.write(commit_HOOKS_result.stderr);
        process.exit(commit_HOOKS_result.status);
      }else{
        console.log('测试打印',commit_HOOKS_result.stdout.toString('utf-8'));
        // console.log('git commit 打印输出',process.stdout.write(commit_HOOKS_result.stdout.toString("utf-8")));
      }

      // const push_HOOKS_result = spawnSync("git push",{
      //   stdio: "pipe",
      //   shell: true,
      //   env: process.env,
      // })

      // if(push_HOOKS_result.status !== 0){
      //   process.stderr.write(push_HOOKS_result.stderr);
      //   process.exit(push_HOOKS_result.status);
      // }else{
      //   console.log('git push 打印输出',process.stdout.write(push_HOOKS_result.stdout));
      // }

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
