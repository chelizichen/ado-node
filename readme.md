# - *AdoNode*

## typescript express ioc decorate aop

## 快速构建 基于Express 之上的 Node ｜ SSR 服务

    npm install ado-node@latest -g

**注**： 使用 @Ado/Rpc Server 时 ，node 的版本最好在14

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
10. 侦听器进行对数据库操作之前的判断
11. 服务层返回对数据库的操作
12. 具体控制层 **After** 拦截器 在具体方法之后
13. 全局控制层 **After** 拦截器之后

**注** : *在拦截器或者管道的任何各个阶段都可以执行响应中断操作（返回不为空的值即可）*

***

packgage.json: **构建node服务所需要的额外的Package**

***

````json
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

## @Ado/CLI 命令行工具

框架提供了一些常用的命令使得开发变得更加简便

* ado -g <router\> // 创建路由模版
* ado create <app\> // 创建@Ado/Node 或 SSR 项目
* ado-cli run-ssr <args\> // 运行@Ado/SSR 项目
* ado-cli run-node // 运行@Ado/Node 项目
* ado-cli build-ssr <args\> // 打包@Ado/SSR 项目
* ado-cli build-node // 打包@Ado/Node项目

ado -g <router\> 将会在当前目录生成四个文件 分别是,便于开发者进行路由文件开发

````ts
  router 
    ｜ router.controller.ts
    ｜ router.service.ts
    ｜ router.module.ts
    ｜ router.entity.ts
````

ado create <app\> 将会给用户提供模版选项

````ts
ado-node % ado create app
? 请选择项目模版 (Use arrow keys)
❯ ado-node 
  ado-node-vue-ssr(vite) 
  ado-node-react-ssr(vite)
````

随后将会下载远程模版使用

### 控制层所需要的装饰器

* @Extends Class HandleController 每一个Controller 类必须基于此父类
* @Controller(url:string)  **定义控制层路由**
* @Inject(Service) **注入 Service 层服务**
* @UsePipe(Pipe:implyments AdoNodePipe)
* @Get(url:string)
* @Post(url:string)
* @**Interface**  AdoNodePipe
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

* @**Interface** AdoOrmBaseEntity
* @Entity(tableName:string)
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
* validate(Entity,plain)
* getConnection // 需要成功连接上数据库
* getRedis // 需要 Redis 环境
* class_transform // 序列化方法
* BeforeInsert // 在插入数据之前调用
* BeforeDelete // 在删除数据之前调用
* BeforeUpdate // 在更新数据之前调用

##### Pipe 管道验证

* UsePipe
* AdoNodePipe
* AdoNodeGlobalPipe
* validate

##### (ado.config.ts)所需要的配置文件

框架对于数据库的操作需要使用配置文件。
**一般来说,配置文件需要放置在 package.json 同级的目录下。**
配置信息需要使用默认导出,框架提供了 defineAdoNodeConfig 方法来完善所需要的各项信息。

````ts
export default defineAdoNodeConfig({
  database: {
    type: "mysql",
    host: "localhost",
    username: "root",
    password: "123456",
    database: "test",
    port: 3306,
    connectionLimit: 10,
  },
  server:{
    base: "/api", // 后端基础的Api路由
    port: 3000, // 后端基础端口号
    upload:"public/server" // 上传文件的路径
  }
});
````

##### *query*

````js
const sql = new query()
  .setEntity(["goods", "seckill"])
  .and({
    "seckill.go_id": "goods.id",
    "seckill.sk_status": "0",
  })
  .pagination(0, 10)
  .getSql();

const sql1 = new query()
  .setEntity(["goods", "seckill"])
  .getSql();

const sql2 = new query()
  .setEntity("goods")
  .like_and({ goods_name: "?" })
  .pagination(0, 10)
  .getSql();

const opt2 = ["%名称2%"];

const sql3 = new query()
  .setEntity("goods")
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
  .setEntity(User)
  .getSql();

const sql = new del()
  .setEntity(User)
  .and("username", "leemlus")
  .and("phone", "13476973442")
  .getSql();


const sql2 = new del()
  .setEntity(User)
  .and({
    username: "leemulus",
    phone: "13476973442",
  })
  .getSql();

const sql3 = new del()
  .setEntity(User)
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
  .setEntity("hotkeyword")
  .setOptions({ thekeys: "疫情新闻" })
  .and("thekeys", "疫情")
  .getSql();

const sql1 = new save()
  .setEntity("goods")
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

-> **全局管道**

````ts

export class TestGlobalPipe implements AdoNodeGlobalPipe {
  run(req:Request,res:Response,next:NextFunction){
    next()
  }
}
````

-> **普通管道**

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

-> **拦截器**

* implyments AdoNodeInterceptor
* UseInterceptor(new InterceptorConstructor())
* 可以实现 请求开始 处理请求前 响应后 三个钩子**

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

* @UsePipe
* @UseInterceptor
* @Get
* @Post
* @Inject *依赖注入*

等装饰器

````ts
@Controller("/app")
class AppController extends AdoNodeControlelr{

  @Inject(AppService)
  AppService:AppService


  @Get("/list")
  public async getList(){
    return this.AppService.getList()
  }
}
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

#### Entity ｜ ORM 对象关系映射

使用@Entity 并且继承 *AdoBaseEntity* 的类，继承AdoBaseEntity类的方法

````ts
@Entity(tableName)
class AppEntity extends AdoBaseEntity{
  @Key
  id!:string;

  @IsNumber
  price!:number;

  @IsEmail
  email!:string;

  @AutoCreate
  createTime!:string;
}
````

#### ORM 事务操作

````ts
const transaction = this.AppEntity.createTransaction()

transaction.push( async () => fn1 )
transaction.push( async () => fn2 )
transaction.push( async () => fn3 )

try{
  await transaction.connection()
  const data = await transaction.start()
  console.log(data)
}catch(e){
  throw new TransactionError(e)
}
````

## 侦听器 Monitor

***

在插入和更新之前可以添加钩子函数来保证是否执行对数据库的操作
库提供了 两个钩子 分别是 @BeforeUpdate @BeforeInsert
在数据库进行插入和更新前会执行

**注**： 因为在底层 钩子的执行 是调用了： ***this.hooks.call( classInstance )*** , 所以当执行 this.xxxEntity.save 或者 update 时，必须 传入的是 **Entity** 类的实例，钩子才会生效

比如

````ts

// -------------Entity-----------------
@Entity("appTable")
class AppEntity extends AdoOrmBaseEntity{
  @BeforeUpdate
  beforeupdate(){
    console.log(this)
  }
}

@Collect()
class AppService{
  @Inject(AppEntity)
  AppEntity:AppEntity;

  save(){
    // 生效
    const app = new AppEntity();
    this.AppEntity.save(app)

    // 不生效
    const app1 = {}
    this.AppEntity.save(app)
  }
}


````

* 一个更为详细的例子

@Entity层 实体类

````ts
@Entity("seckill")
export class Seckill extends AdoOrmBaseEntity {
  @Key
  id!: string;

  @IsNumber
  go_id!: string;

  @IsNumber
  sk_price!: string;

  @IsNumber
  sk_status!: string; 

  @BeforeInsert
  TestBeforeInsert() {
    console.log("插入前钩子");
    console.log("价格为", this.sk_price, this.go_id);
  }

  @BeforeUpdate
  TestBeforeUpdate() {
    console.log("更新前钩子");
    console.log("价格为", this.sk_price, this.go_id);
  }
}
````

@Service 层代码

````ts
const transaction = this.Seckill.createTransaction();
const seckill = new Seckill();

seckill.go_id = "10";
seckill.sk_price = "99.00";
seckill.sk_status = "1";

const seckill1 = new Seckill()
seckill1.go_id = "10";
seckill1.sk_price = "666.00";
seckill1.sk_status = "1";
seckill1.id = "10";

transaction.push(async () => this.Seckill.save(seckill))
transaction.push(async () => this.Seckill.update(seckill1));

try {
  await transaction.connection();
  const data = await transaction.start();
  return data;
} catch (e) {
  return e;
}
// --------------------input----------------- \\
插入前钩子
价格为 99.00 10
更新前钩子
价格为 666.00 10
````

* ORM 缓存请求

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

this.user.save( 
  ORMInstance : extends AdoOrmBaseEntity, CacheOptions:cacheOptions // 缓存选项
)

IF(UPDATE){
  // 强制更新                                                                                                
  this.cache(
    CacheOptions:cacheOptions,
    UpdateInstance:extends AdoOrmBaseEntity
  )
}


````

## View

### 使用 *@View* 和 AdoOrmBaseView 创建视图

框架提供了 CreateView 方法利用链式操作来 **创建->执行** sql语句以创建视图。
**框架设置了 migration?:boolean 来判断视图是否需要迁移 或者 修改**
使用@View 装饰的类仍然支持 IOC 的模式，[使用](https://github.com/chelizichen/ado-node/blob/master/lib/ioc/ioc.ts)

由于视图的创建不依赖成员变量，且视图大多数情况下不进行任何增删改的操作，所以我们只对 基类 **AdoOrmBaseView** 提供了查询｜缓存查询的方法。

关于成员变量-> **由于视图没有主键，所以只能使用 @Index 装饰器来对应视图的唯一索引，且 视图类要求必须使用@Index，否则无法执行 基类的 getOneBy 等方法** , 成员变量可以使用 @Inject(AdoOrmBaseEntity) 的方式注入其他实体类 , 一方面代表着 **这个视图是由哪几个表创建的** , 另一方面可以很方便的使用 **[IOC]((https://github.com/chelizichen/ado-node/blob/master/lib/ioc/ioc.ts))** 带来的好处

***

````ts
@View({
  engine: CreateView(viewName : string) // set View name
    .addEntity([xxx,yyy] : Array<AdoOrmBaseEntity>) // add Entity
    .omit(["yyy.id","xxx.~","yyy.~"] : Array<string>) // omit fields
    .addOptions(options_sql: string ) // like "xxx.id = yyy.xxx_id"
    .create(), // create sql
  migration?:boolean 
})
class [ViewName] extends AdoOrmBaseView{
  @Index
  id!:string;

  @Inject(xxxEntity)
  xxx:xxxEntity;

  @Inject(yyyEntity)
  yyy:yyyEntity;
}
````

## 微服务

### @Ado/Rpc - Client/Server

RPC服务为 **C/S** 架构，基于TCP 之上 。Client 端 基于Express 的 HTTP 请求 进行装包后，以Buffer的形式转发给 Server 端。Server 端接受包后进行拆包，而后运行相关函数再返回给Client 端

框架使用 Yaml 文件作为统一的文档，yaml 文件规定了

* 一致的接口名
* 接口描述
* 接口所需要的参数 (request，response)
* 服务端 IP 地址

在最外层目录下规定需要定义 arc.config.yaml 作为配置文件
该配置文件定义了

* yaml 接口/参数/模块的配置路径
* 生成 client-server 文件的目录路径

框架提供了 命令行工具 可以快速的根据 arc.config.yaml 扫描  接口/参数/模块的配置路径，并生成 client 或者 server 相关的文件，帮助开发者快速开发服务

### arc.config.yaml

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

## Module 模块化

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

## 启动服务

* Extends AdoNodeServer

Modules 里面包含各种 Module
Base 为基础的 Api路径
Port 为端口号
GlobalPipes 为全局管道

````typescript

@Modules({
  Modules: [AppModule],
  GlobalPipes: [TestGlobalPipe],
})
class AdoNodeServerImpl extends AdoNodeServer { }

AdoNodeServerImpl.runSSRServer((app) => {
  app.use("/AdoServer", express.static(path.join(__dirname, "../public")));
});
````
