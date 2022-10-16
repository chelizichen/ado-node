# - ADO-Node

## 基于 老牌框架 Express Typescript 装饰器 的后端方案 用于解决管理路由 和 异步任务的问题

### 案例

***

### 控制层所需要的装饰器

* @Extends Class <i style="color:royalblue">HandleController</i> 每一个Controller 类必须基于此父类
* @Controller(url:string)  **定义控制层路由**
* @Inject(Service) **注入 Service 层服务**
* @UsePipe(Pipe:implyments AdoNodePipe)
* @Get(url:string)
* @Post(url:string)
* @<i style="color:royalblue">Interface</i> AdoNodePipe
* @Error({message:string;code?:Code;force?: boolean;})

### Service层所需要的装饰器

* @Collect() **收集Service 服务**
* @UseCatch(cacheInst:string)
* @UseDataBase(dbInst:string)
* @Inject() **同样可以注入 ORM 层的服务**

### 对象关系映射(ORM)层

* @**<i style="color:royalblue">Interface</i>** AdoOrmBaseEnity
* @Enity(dbInst:string)
* @Collect() **收集 ORM 层对象**
* @Key 对应 关系型 数据库 的 主键
* @Keyword 用于 模糊查询
* @AutoCreate 自动生成的列 **id | createTime**
* @IsEmail 判断是否是邮箱
* @IsNumber 判断是否为数字
* @IsOptional 判断是否为可选 如果可选 则在 func validate  中不会进行验证

#### 错误处理

* ClientError
* DataBaseError
* FieldError
* TypesError
  


##### ORM 操作

* query
* del
* update
* save
* validate(inst:DTO instantce )

##### Pipe 管道验证

* UsePipe
* AdoNodePipe
* AdoNodeGlobalPipe
* validate

##### 配置类

* @Config
* @AdoNodeConfig
* @CreateDb(dbInst:string)
* @CreateCache(cacheInst:string)
* **useConfig**


#### Run

* func defineAdoNodeOptions(options) 定义需要的选项
* <i style="color:royalblue"> Extends AdoNodeServer </i>


````

@AdoNodeConfig(configClass:@Config -- 使用 @Config 定义 的配置类)

class AdoNodeServerImpl extends AdoNodeServer {}

AdoNodeServerImpl.run(options);
````
