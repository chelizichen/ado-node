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
        const lsarray = stdou.split("\n").filter((el) => {
          return !el.endsWith(".tgz") && el;
        });

        resolve({ ls: lsarray, stderr });
      });
    });
  }
  // 解压
  runServer(serverName: string = "AdoTestServer") {
    return new Promise((resolve, reject) => {
      this.cd_dir(serverName)
        .then((res) => {
          if (res == true) {
            this.de_comp(serverName).then((res) => {
              if (res == true) {
                // 从工作区中启动服务
                exec(
                  `node public/server/${serverName}/dist/index.js`,
                  function (err) {
                    if (err) {
                      reject(err);
                    }
                  }
                );
                resolve(serverName + " 服务开启！");
              }
            });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // 创建 Server 目录
  cd_dir(serverName: string) {
    return new Promise(async (resolve, reject) => {
      exec(`cd public/server \n mkdir -p ${serverName}`, function (err) {
        if (err) {
          reject(err);
        }
        resolve(true);
      });
    });
  }

  // 解压相关文件
  de_comp(serverName: string) {
    return new Promise((resolve, reject) => {
      exec(
        `tar zxvf public/server/${serverName}.tgz -C ./public/server/${serverName}`,
        function (err) {
          if (err) {
            reject(err);
          }
          resolve(true);
        }
      );
    });
  }
}
