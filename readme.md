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

***


##### *query*

````
const sql = new query()
  .setEnity(User)
  .and("username", "leemulus")
  .and("age", "13")
  .pagination(1, 10)
  .getSql();

const sql1 = new query()
  .setEnity(User)
  .and({
    username: "leemulus",
    phone: "13476973442",
  })
  .pagination(0, 10)
  .getSql();

const sql2 = new query()
  .setEnity(User)
  .setColumn(["phone", "username", "age"])
  .getSql();

const sql3 = new query()
  .setEnity(User)
  .setColumn(["phone", "username", "age"])
  .pagination(0, 10)
  .getSql();

const sql4 = new query()
  .setEnity(User)
  .setColumn(["phone", "username", "age"])
  .and("key", "value")
  .like("key1", "value1", "and")
  .pagination(0, 10)
  .getSql();

const sql5 = new query()
  .setEnity(User)
  .setColumn(["phone", "username", "age"])
  .like("key3", "value3", "and")
  .or("key", "value")
  .or("key2", "value2")
  .pagination(0, 10)
  .getSql();

select * from User  where username = "leemulus" and age = "13" limit 1,10
select * from User  where username = "leemulus" and phone = "13476973442" limit 0,10
select phone,username,age from User
select phone,username,age from User limit 0,10
select phone,username,age from User where key = "value" and key1 like "%value1%"  limit 0,10
select phone,username,age from User where key3 like "%value3%"  or key = "value" or key2 = "value2" limit 0,10

````

##### *delete*

````
const sql1 = new del()
  .setEnity(User)
  .getSql();

const sql = new del()
  .setEnity(User)
  .and("username", "leemlus")
  .and("phone", "13476973442")
  .getSql();


const sql2 = new del()
  .setEnity(User)
  .and({
    username: "leemulus",
    phone: "13476973442",
  })
  .getSql();

const sql3 = new del()
  .setEnity(User)
  .or({
    username: "leemulus",
    phone: "13476973442",
  })
  .getSql();

sql1 delete from User 
sql delete from User  where username = "leemlus" and phone = "13476973442"
sql2 delete from User  where username = "leemulus" and phone = "13476973442"
sql3 delete from User  where username = "leemulus" or phone = "13476973442"

````

##### *update* &&  *save*

````
const sql = new update()
  .setEnity("hotkeyword")
  .setOptions({ thekeys: "疫情新闻" })
  .and("thekeys", "疫情")
  .getSql();

const sql1 = new save()
  .setEnity("goods")
  .setOptions("g_price", "666")
  .setOptions("g_type", "222")
  .setOptions("g_name", "商品安利")
  .getSql();


opt: [ { thekeys: '疫情新闻' } ],
sql: 'update  hotkeyword Set ?  where thekeys = "疫情"'

opt: [ { g_price: '666', g_type: '222', g_name: '商品安利' } ],
sql: 'insert into  goods SET ? '
````

#### *ORM*

````

this.AnyEnity.getOneBy(val)
this.AnyEnity.countBy(val)
this.AnyEnity.getBy(val)
this.AnyEnity.save(val)
this.AnyEnity.getMany(val)
this.AnyEnity.getList(val)

````