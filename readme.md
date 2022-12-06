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
* @Enity(tableName:string,connect:mysql.PoolConnection)
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




##### *query*

````js
const sql = new query()
  .setEnity(["goods", "seckill"])
  .and({
    "seckill.go_id": "goods.id",
    "seckill.sk_status": "0",
  })
  .pagination(0, 10)
  .getSql();

const sql1 = new query()
  .setEnity(["goods", "seckill"])
  .getSql();

const sql2 = new query()
  .setEnity("goods")
  .like_and({ goods_name: "?" })
  .pagination(0, 10)
  .getSql();

const opt2 = ["%名称2%"];

const sql3 = new query()
  .setEnity("goods")
  .and("goods_rest_num", "20")
  .or("sort_child_id", "4")
  .pagination(0, 10)
  .getSql();

"sql": "select * from goods,seckill where seckill.go_id = goods.id and seckill.sk_status = 0 limit 0,10",
"sql1": "select * from goods,seckill",
"sql2": "select * from goods where goods_name like ? limit 0,10",
"sql3": "select * from goods where goods_rest_num = 20 or sort_child_id = 4  limit 0,10",

````

##### *delete*

````js
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

````js
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




### *Pipe* 使用管道

````js
// 全局管道本质上等同于
app.get(" * ",func(req,res,next){})
````

*全局管道*

````ts

export class TestGlobalPipe implements AdoNodeGlobalPipe {
  run(req:Request,res:Response,next:NextFunction){
    next()
  }
}
````

*普通管道*

````ts

class FundCodePipe implements AdoNodePipe {
  run(req: Request){
    // 任何返回值 判断为真时都将被 res.json() 处理
    // 只有返回false 或者 void 时会进入下一个生命周期
  }
}
````

### 结合 *class_transform* 的一个完整的例子

* class_transform -> 将 朴素的 数据(JSON) 变成为 类的实例*

````ts
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
````

*拦截器*
implyments AdoNodeInterceptor
UseInterceptor(new InterceptorConstructor())

**可以实现 请求开始 处理请求前 响应后 三个钩子**

````ts
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
        "token abcdefg";
      return req.headers
    }
  }
}
````

#### Controller 

控制层的类必须继承 *AdoNodeControlelr*，否则 将会提示错误
在控制层里面可以使用
@UsePipe
@UseInterceptor
@Get
@Post
@Inject *依赖注入*
等装饰器

````ts
@Controller("/app")
class AppController extends AdoNodeControlelr{}
````

#### Service

服务层提供相应的业务服务
服务层的类 需要使用 @Collect 装饰器 收集原型

````ts

@Collect()
class AppService{
  getList(){
    return '......'
  }
}
````

#### Enity ｜ ORM 对象关系映射

使用@Enity 并且继承 *AdoBaseEnity* 的类，会带有各类的方法

````ts
@Enity(tableName,connect)
class AppEnity extends AdoBaseEnity{}

～

const appEnity = new AppEnity()
appEnity.getOneBy(val)
appEnity.countBy(val)
appEnity.getBy(val)
appEnity.save(val)
appEnity.getMany(val)
appEnity.getList(val)
appEnity.query(sql,options?)
````

#### Module 模块化

Provider 里 可以包含各类的 Module
比如 一个商品 Module ： GoodsModule
他的  Provider 可以是 SeckillModule , SellerModule,
他的 Controller 则为 GoodsController
形成一个模块

````ts
@Module({
  Provider: [UserModule,StudentModule],
  Controller: [AppController],
})
export class AppModule {}
````



### 启动服务

* <i style="color:royalblue"> Extends AdoNodeServer </i>

Modules 里面包含各种 Module
Base 为基础的 Api路径
Port 为端口号
GlobalPipes 为全局管道

````typescript

@Modules({
  Modules: [AppModule],
  Base: "/api",
  Port: 3000,
  GlobalPipes: [TestGlobalPipe],
})
class AdoNodeServerImpl extends AdoNodeServer { }

AdoNodeServerImpl.runSSRServer((app) => {
  app.use("/AdoServer", express.static(path.join(__dirname, "../public")));
});
````