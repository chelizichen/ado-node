# BugList 

## 1、缓存请求的问题 ： 设计的原因

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