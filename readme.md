# @ado/rpc server v3.0.0

````shell
->  npm install 
->  npm install ado-node@latest
->  npm run dev
````

## ado.config.js

````shell
    用于配制数据库信息
````

## arc.config.yaml

````shell
    用于配制 RpcServer 相关信息
    生成目录文件

    命令行 arc generate server 即可生成文件
````


````yaml
# rpc 配置
arc:
  # yaml 配置文件
  yaml: 
    modules: src/yaml/modules
    interface: src/yaml/interface
    struct: src/yaml/struct
  #  生成 client-server 的路径
  generate: 
    # 客户端生成rpc 接口文件需要的路径
    server: src/server
    # 服务端生成rpc 接口文件需要的路径
    client: src/rpc/client
````
