const { spawn, spawnSync } = require("child_process");
const chalk = require("chalk");
const fs = require("fs");
const path = require('path');
const os = require("os")
function runViteApp() {
  const currProcess = spawn("vite", {
    stdio: "inherit",
    shell: true,
    env: process.env,
  });
}

function runNodeApp() {
  const currProcess = spawn(
    "ts-node-dev --project tsconfig.server.json src/index.ts",
    {
      stdio: "inherit",
      shell: true,
      env: process.env,
    }
  );
}

function buildViteApp() {
  const currProcess = spawn("vite build", {
    stdio: "inherit",
    shell: true,
    env: process.env,
  });
}

function buildNodeApp() {
  const currProcess = spawn("tsc --project tsconfig.server.json", {
    stdio: "inherit",
    shell: true,
    env: process.env,
  });
}

function previewNodeApp() {
  const currProcess = spawn("node dist/index.js", {
    stdio: "inherit",
    shell: true,
    env: process.env,
  });
}

function previewRpcServer() {
  const currProcess = spawn("node dist/src/index.js", {
    stdio: "inherit",
    shell: true,
    env: process.env,
  });
}

function previewViteApp() {
  const currProcess = spawn("vite preview", {
    stdio: "inherit",
    shell: true,
    env: process.env,
  });
}


function runBuildApp() {
  return new Promise((resolve) => {
    spawnSync("npm run ", ["build"], {
      stdio: "inherit",
      shell: true,
      env: process.env,
    });
    resolve();
  });
}



// cat server.tgz  cache_modules.tgz > merge.tgz
function createTgz(tgzName, opt) {



  let tgzServerPath =  `.ado_cache/${tgzName}`;

  let cachedir =  ".ado_cache";

  let node_modules_cache =  ".ado_cache/cache_modules.tgz";
  let server_cache =  ".ado_cache/ado_server.tgz";

  let nodeModulesDir =  "node_modules";

  let pkgPath =  "package.json";
  let distPath =  "dist";
  let publicPath = "public";

  let hasCacheDir = fs.existsSync(cachedir);
  let hasCacheModules = fs.existsSync(cachedir);
  let hasPublicDir = fs.existsSync(publicPath)

  function winOrForceTgz(){
    const server_cmd = `tar -zcvf ${tgzServerPath} ${distPath} ${pkgPath} ${nodeModulesDir} ${publicPath}`;
    console.log(server_cmd);
    spawnSync(server_cmd, {
      stdio: "inherit",
      shell: true,
      env: process.env,
    });
  }

  // ??????????????????
  if (!hasCacheDir) {
    fs.mkdirSync(cachedir);
  }
  if (!hasPublicDir) {
    fs.mkdirSync(publicPath)
  }
  

  winOrForceTgz()
  return;

  if(os.platform == "win32"){
    winOrForceTgz()
    console.log("Windows ???????????? tgz ??????????????????");
    return 
  }

  // ??????????????????
  if (opt.force) {
    const cmd = `tar -zcvf ${node_modules_cache} ${nodeModulesDir}`;
    spawnSync(cmd, {
      stdio: "inherit",
      shell: true,
      env: process.env,
    });
  }
  const server_cmd = `tar -zcvf ${server_cache} ${distPath} ${pkgPath} ${publicPath}`;
  spawnSync(server_cmd, {
    stdio: "inherit",
    shell: true,
    env: process.env,
  });
  
  streamMerge(cachedir,tgzServerPath)

  // ????????????

  // const merge_cmd = `cat ${server_cache}  ${node_modules_cache} > ${tgzServerPath}`
  // spawnSync(merge_cmd, {
  //   stdio: "inherit",
  //   shell: true,
  //   env: process.env    
  // })


  

}





/**
 * Stream ??????
 * @param { String } sourceFiles ??????????????????
 * @param { String } targetFile ????????????
 */
function streamMerge(sourceFiles, targetFile) {
  const scripts = fs.readdirSync(sourceFiles).map(el=>".ado_cache/"+el).filter(el=>el!=targetFile); // ???????????????????????????????????????
  const fileWriteStream = fs.createWriteStream(targetFile); // ?????????????????????

  console.log(scripts);
  streamMergeRecursive(scripts, fileWriteStream);
}

/**
 * Stream ?????????????????????
 * @param { Array } scripts
 * @param { Stream } fileWriteStream
 */
function streamMergeRecursive(scripts=[], fileWriteStream) {
  // return new Promise
  // ???????????????????????????
  if (!scripts.length) {
    console.log("????????????");
    console.log("?????????????????? node_modules ?????????????????????????????????");
    console.log(chalk.blue(' npm run release -- -f '));
    return fileWriteStream.end("console.log('Stream ????????????')"); // ??????????????????????????????????????????
  }

  const currentFile = scripts.shift();
  const currentReadStream = fs.createReadStream(currentFile); // ????????????????????????

  currentReadStream.pipe(fileWriteStream, { end: false });
  currentReadStream.on('end', function() {
    streamMergeRecursive(scripts, fileWriteStream);
  });

  currentReadStream.on('error', function(error) { // ?????????????????????????????????????????????????????????
    console.error(error);
    fileWriteStream.close();
  });
}

module.exports = {
  runViteApp,
  runNodeApp,
  buildViteApp,
  buildNodeApp,
  previewNodeApp,
  previewViteApp,
  createTgz,
  runBuildApp,
  previewRpcServer
};
