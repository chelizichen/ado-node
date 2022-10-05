#  - ADO-Node
## 基于 老牌框架 Express Typescript 装饰器 的后端方案 用于解决管理路由 和 异步任务的问题


### 案例

#### Controller 控制层

####  @Controller 控制器
####   @Inject() 注入依赖
####   @Get() @Post() 
####   @Error() 用于提前定义错误与强制停用接口

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

#### Run 
````
import createServer from "";
import { options } from "";

createServer(options);

````
