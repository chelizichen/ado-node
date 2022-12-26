# BugList

## 1、缓存请求的问题 ： 设计的原因 （已解决）

````ts

this.seckill.getOne(key,cacheOptions:{
    cache:true, // 表示这个请求的结果将会被缓存
    timeout:1000  // 表示这个请求的超时结果为 1000 秒
    force ?(isOptional):true // 强制更新缓存 
})

````

使用场景：

* 缓存某个不常更改的数据 比如用户信息等
* 当用户提交更改信息时，强制刷新缓存
* 返回缓存后的值

````TS

this.user.login( userInstance )
this.cache({})

````

## 2. windows 版本下 命令行不能运行

错误描述:

````cmd
在此系统上禁止运行脚本没有相应的权限
````

解决方法:

````cmd
1.win+X键，使用管理员身份运行power shell

2.输入命令：set-executionpolicy remotesigned

默认是N，输入A
````

## 3. hasaky 命令 git push 时报错的问题

错误描述：
在 npm publish 后执行 git push 时出错

````cmd
[ERR_STEAM_VALUES]:May not write null values to stream
````

解决办法:
