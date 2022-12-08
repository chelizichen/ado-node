***

AdoNode-3.0.0 的计划

将单个 Node服务 构建 成为Server 文件 然后将服务实例上传到云上，每个实例占用不同的端口号，实现云服务。

构建命令使用 
"tar": "npm run build & tar -cvf **AdoTestServer.tgz** ./dist package.json node_modules"
其中 AdoTestServer.tgz 可以更换成其他定制的服务名 但是必须（或者最好）使用 ...Server.tgz 结尾

vue&element 代码
````
<el-upload
  class="upload-demo"
  drag
  action="http://localhost:3000/api/files/upload"
  multiple
  :on-success="handle_success"
>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">服务名最好以 Server.tgz 结尾</div>
</el-upload>
````

***

将打包的tgz文件，放置到Web后端上，
Node.js 后端 解压 运行node命令 , 开启服务。

````
压缩
tar -cvf [文件名].tar [文件目录] //打包成.tar文件
tar -jcvf [文件名].tar.bz2 [文件目录] //打包成.bz2文件
tar -zcvf [文件名].tar.gz [文件目录] //打包成.gz文件


解压缩
tar -xvf [文件名].tar //解压到当前文件
tar -xvf [文件名].tar -C [文件目录] //将.tar文件解压到指定目录
tar -jxvf [文件名].tar.bz2 -C [文件目录] //解压.bz2文件到指定目录
tar -zxvf [文件名].tar.gz -C [文件目录] //解压.gz文件到指定目录

````
