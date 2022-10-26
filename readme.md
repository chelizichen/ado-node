# - *AdoNode*

#### <i style="color:royalblue"> typescript express ioc decorate aop </i>

## 以极简的代码构建高效的 Node.js 服务

***
设计思想：
  **高度使用 IOC 和 AOP， 将 请求 - 响应分为不同的生命周期 每个生命周期实现不同的逻辑功能**

1. 请求
2. 全局管道 -〉req , res , next
3. 控制层
4. 全局控制层 **Before** 拦截器
5. 具体控制层 **Before** 拦截器
6. 具体控制层 **Pipe** 管道 在具体方法之前
7. 具体控制层 **Hack** 拦截器 在具体方法之前
8. 执行具体控制层逻辑
9. 执行服务层逻辑
10. 服务层返回对数据库的操作
11. 具体控制层 **After** 拦截器 在具体方法之后
12. 全局控制层 **After** 拦截器之后

*在拦截器或者管道的任何各个阶段都可以执行响应中断操作（返回不为空的值即可）*

***

**构建node服务所需要的额外的Package**

***

````
  "dependencies": {
    "express": "^4.18.1",
    "jsonwebtoken": "^8.5.1",
    "mysql": "^2.18.1",
    "redis": "^4.3.1",
  },
    "devDependencies": {
    "@types/express": "^4.17.13",
    "@types/jsonwebtoken": "^8.5.9",
    "@types/mysql": "^2.15.21",
    "@types/node": "^18.6.3",
    "ts-node-dev": "^2.0.0",
    "typescript": "^4.6.4",
    "ts-node": "^10.9.1"
  }
````
***
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
* @Query 等同于 Express -> type Request['query']
* @Body  等同于 Express -> type Request['body']
* @Headers 等同于 Express -> type Request['headers']

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
* validate(Enity,plain)

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

#### *Pipe* 使用管道

````
  // 全局管道本质上等同于
  app.get(" * ",func(req,res,next){})
````

*全局管道*

````

export class TestGlobalPipe implements AdoNodeGlobalPipe {
  run(req:Request,res:Response,next:NextFunction){
    next()
  }
}
````

*普通管道*

````

class FundCodePipe implements AdoNodePipe {
  run(req: Request){
    // 任何返回值 判断为真时都将被 res.json() 处理
    // 只有返回false 或者 void 时会进入下一个生命周期
  }
}
````
#### 10.26 Update
*class_transform*
*将 朴素的 数据 变成为 类的实例*
````
// Pipe 层
class UserInfoPlainPipe implements AdoNodePipe {
  async run(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>
  ) {
    const error = validate(User, req.body);
    if (error instanceof Error) {
      return error;
    } else {
      const user = class_transform.plainToClass(User, req.body);
      req.body = user;
    }
    return;
  }
}

// Controller 层
  @Post("/a5")
  @UsePipe(new UserInfoPlainPipe())
  public async a5(@Body() user: User) {
    return {
      data: user.FullName(),
      msg: "ok",
    };
  }

// Enity 层

@Enity("mysql")
@Collect()
export class User extends AdoOrmBaseEnity {
  @Key
  @AutoCreate
  id!: number;

  @IsNumber
  phone!: number;

  @Keyword
  @IsOptional
  username!: string;

  @IsNumber
  password!: string;

  @IsEmail
  email!: string;

  @AutoCreate
  @IsOptional
  createTime!: string;

  @AutoCreate
  FullName() {
    return this.username + this.email;
  }
}
````

拦截器
implyments AdoNodeInterceptor
UseInterceptor(new InterceptorConstructor())

**可以实现 请求开始 处理请求前 响应后 三个钩子**

````
class UserLogInterceptor implements AdoNodeInterceptor {
  async hack(req: Request) {
    console.log("处理中", !req.headers);
  }
  async after(req: Request) {
    console.log("处理后", !req.headers);
  }

  async before(req: Request) {
    console.log("处理前", req.headers);
    if (!req.headers["token"]) {
      req.headers["token"] =
        "token a5sdimkgdsa2134ij213saklnbgjoasjdaskjdal1231";
      return req.headers
    }
  }
}
````
