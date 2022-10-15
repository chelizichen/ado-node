# - ADO-Node

## 基于 老牌框架 Express Typescript 装饰器 的后端方案 用于解决管理路由 和 异步任务的问题

### 案例

#### Controller 控制层

#### @Controller 控制器

#### @Inject() 注入依赖

#### @Get() @Post()

#### @Error() 用于提前定义错误与强制停用接口

```
@Controller("/app")
class AppController implyments HanldeController{
    
    @Inject(AppService)
    AppService!:AppService
    
    @Get("/list")
    public async getUser(){
        return await this.AppService.getUser()
    }
    
    @Post("/update")
    @Pipe( func )
    public async update(req:Body<{ DTO }>,res:Response){
        const { ...xxx } = req.body
        const ret = this.AppService.update(...xxx)  
        return ret
    }
    
    @Get("/delete")
    @Error({
        force:true
    })
    public async delete(){
        return ....
    }
    
    
    
    
}
```

#### Service 层

 可以用Collect 收集多个 Service 注入进 Controller

````
@Collect()
class AppService {
  @Inject(AppMapper)
  AppMapper!: AppMapper;

  public async getList() {
    const opt = ["1"];
    const ret = await this.AppMapper.getUser(opt);
    return ret;
  }
}

````

#### Mapper 层

#### @Mapper() 用来收集Mapper 服务

#### @Connect() 用来收集 数据库连接服务

#### @Select() 用来写sql 语句

````
@Mapper()
@Connect(coon)
class AppMappper {
  @Select(`select * from  user where id = ? `)
  public async getUser(_options: selectOptions) {}
}

````

#### Server Options 加载配置

````
export const options: HandleProxyOptions = {
  controller: [AppController],
  base: "/app",
  port: 3000,
  globalPipes: [TestGlobalPipe],
};
````

#### date 10.5 update

***
新增一键添加接口功能

新增

* @Curd(curdurl , enityClass , mysqlConn )
* @Enity 用来定义实体类
* @Key 用来定义主键
* @Keyword 用来定义模糊查询的参数
* @UseCache 用来定义Redis 缓存实例

````
const coon = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  multipleStatements: true,
});

@Controller("/shadow")
class ShadowController extends HandleController {

  @UseCache(createClient())
  Redis!: any;
  
  @Curd("/member", Member, coon)
  public async fundCurd() {}
}

@Enity
export class Member {
  @Key
  id!: number;
  @Keyword
  name!: string;
  sex!: string;
}

````

Redis 的秒杀案例

````
@Controller("/product")
class ProductController extends HandleController {
  
  @UseCache(createClient())
  Redis!: RedisClientType;
  
  @Post("/seckill")
  public async SecKill(
    req: Body<{ uId: string; proId: string }>,
    _res: Response
  ) {
    const body = req.body;
    const getRest = await this.App917Service.getRestKey(this.Redis, body.proId);
    const getUserKey = await this.App917Service.getUserKey(
      this.Redis,
      body.uId
    );
    if (getRest.total === null) {
      return {
        msg: "还没开始",
      };
    }
    const hasMember = await this.Redis.sIsMember(getUserKey, body.uId);
    if (hasMember) {
      return {
        msg: "您已秒杀成功，不能重复操作",
      };
    }
    if (getRest.total <= 0) {
      return {
        msg: "已无库存",
      };
    }
    if (getRest.total >= 1) {
      await this.Redis.decr(getRest.key);
      await this.Redis.sAdd(getUserKey, body.uId);
      return {
        msg: "秒杀成功",
      };
    }
    return Ret.Message(0, "success", "data");
  }

  @Post("/addProd")
  public async addProd(
    req: Body<{ proId: string; total: string }>,
    _res: Response
  ) {
    const key = `sk:${req.body.proId}:qt`;
    await this.Redis.set(key, req.body.total);
    return {
      msg: "设置成功",
    };
  }

}
````


***
#### date 10.15 update
新增类 <b>class < query ></b>
*链式获取sql 语句*

````


const sql = new query()
  .setEnity(user)
  .and("username", "leemulus")
  .and("age", "13")
  .pagination(1, 10)
  .getMany();
const sql1 = new query()
  .setEnity(user)
  .and({
    username: "leemulus",
    phone: "13476973442",
  })
  .pagination(0, 10)
  .getMany();

const sql2 = new query()
  .setEnity(user)
  .setColumn(["phone", "username", "age"])
  .getMany();

const sql3 = new query()
  .setEnity(user)
  .setColumn(["phone", "username", "age"])
  .pagination(0, 10)
  .getMany();
````
***

### ConfigClass 
````
@Config
class commonClass {
  @CreateCache("redis")
  public async getRedis() {
    return await createClient();
  }
  @CreateDb("mysql")
  public async getConn() {
    console.log("注入数据库连接");
    const config = {
      host: "localhost",
      user: "root",
      password: "12345678",
      database: "boot", //所用数据库
      port: 3306,
    };
    const coon = await mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database,
      port: config.port,
      multipleStatements: true,
    });
    return coon;
  }
}
````
***
#### Run 

````
@AdoNodeConfig(commonClass)
export class AdoNodeServerImpl extends AdoNodeServer {}
AdoNodeServerImpl.run(options);
````
