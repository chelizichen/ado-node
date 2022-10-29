import { exec } from "node:child_process";
// import path from "path";
import { Collect } from "../../../lib/core";

@Collect()
export class FilesService {
  getFilesList() {
    return new Promise((resolve, reject) => {
      exec("ls public/server", function (err, stdou, stderr) {
        if (err) {
          reject(err);
        }
        const lsarray = stdou.split("\n").filter((el) => el);

        resolve({ ls: lsarray, stderr });
      });
    });
  }

  deCompression(tgzServer: string) {
    return new Promise(async (resolve, reject) => {
      exec(
        `tar zxvf public/server/${tgzServer}.tgz -C ./public/server/${tgzServer}`,
        async function (err, stdou, stderr) {
          if (err) {
            reject(err);
          }
          exec(
            "node public/server/AdoTestServer/dist/index.js ",
            function (err) {
              if (err) {
                reject(err);
              }
            }
          );

          resolve({ stdou, stderr });
        }
      );
    });
  }

  test() {
    return new Promise((resolve, reject) => {
      exec("node public/server/AdoTestServer/dist/index.js", function (err) {
        if (err) {
          reject(err);
        }
        resolve("AdoTestServer 服务开启！");
      });
    });
  }
}
