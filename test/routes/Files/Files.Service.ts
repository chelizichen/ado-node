import { exec } from "node:child_process";
// import path from "path";
import { Collect } from "../../../lib/core";

// 压缩命令
// tar -cvf AdoTestServer.tgz ./dist package.json node_modules

@Collect()
export class FilesService {
  getFilesList() {
    return new Promise((resolve, reject) => {
      exec("ls public/server", function (err, stdou, stderr) {
        if (err) {
          reject(err);
        }
        console.log(stdou);

        const lsarray = stdou.split("\n").filter((el) => {
          return el.endsWith(".tgz") && el;
        });

        resolve({ ls: lsarray, stderr });
      });
    });
  }

  // 创建 Server 目录
  cd_dir(dirName: string) {
    return new Promise(async (resolve, reject) => {
      exec(`cd public/server \n mkdir -p ${dirName}`, function (err) {
        if (err) {
          reject(err);
        }
        resolve(true);
      });
    });
  }

  // 解压相关文件
  de_comp(originName: string, dirName: string) {
    return new Promise((resolve, reject) => {
      exec(
        `tar zxvf public/server/${originName} -C ./public/server/${dirName}`,
        function (err) {
          if (err) {
            reject(err);
          }
          resolve(true);
        }
      );
    });
  }

  upload(fileName: string, fileAndDirName: string) {
    return new Promise((resolve, reject) => {
      this.cd_dir(fileAndDirName).then((res) => {
        if (res === true) {
          this.de_comp(fileName, fileAndDirName).then((res) => {
            if (res == true) {
              const nodePath = `node public/server/${fileAndDirName}/dist/index.js`;
              console.log(nodePath);

              exec(nodePath, function (err) {
                if (err) {
                  reject(err);
                }
              });
              resolve(fileAndDirName + " 服务开启！");
            }
          });
        }
      });
    });
  }
}
