***

AdoNode-3.0.0 的计划

将单个 Node服务 构建 成为Server 文件 然后将服务实例上传到云上，每个实例占用不同的端口号，实现云服务。


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
