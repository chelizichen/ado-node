"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// index.ts
var ado_node_exports = {};
__export(ado_node_exports, {
  AdoNodeController: () => AdoNodeController,
  AdoNodeServer: () => AdoNodeServer,
  AdoOrmBaseEntity: () => AdoOrmBaseEntity,
  AdoOrmBaseView: () => AdoOrmBaseView,
  All: () => All,
  AutoCreate: () => AutoCreate,
  BeforeDelete: () => BeforeDelete,
  BeforeInsert: () => BeforeInsert,
  BeforeUpdate: () => BeforeUpdate,
  Body: () => Body,
  Call: () => Call,
  ClientError: () => ClientError,
  Collect: () => Collect,
  Controller: () => Controller,
  CreateView: () => CreateView,
  DataBaseError: () => DataBaseError,
  Entity: () => Entity,
  FieldError: () => FieldError,
  GenereateRouter: () => GenereateRouter,
  Get: () => Get,
  Headers: () => Headers,
  Index: () => Index,
  Inject: () => Inject,
  IsEmail: () => IsEmail,
  IsNumber: () => IsNumber,
  IsOptional: () => IsOptional,
  Key: () => Key,
  Keyword: () => Keyword,
  Module: () => Module,
  Modules: () => Modules,
  Params: () => Params,
  Post: () => Post,
  Query: () => Query,
  Register: () => Register,
  Req: () => Req,
  Res: () => Res,
  RpcClientController: () => RpcClientController,
  RpcClientModules: () => RpcClientModules,
  RpcServerBoost: () => RpcServerBoost,
  RpcServerController: () => RpcServerController,
  RpcServerModules: () => RpcServerModules,
  SerivceMap: () => SerivceMap,
  Timeout: () => Timeout,
  TypesError: () => TypesError,
  UseControllerInterceptor: () => UseControllerInterceptor,
  UseInterceptor: () => UseInterceptor,
  UsePipe: () => UsePipe,
  View: () => View,
  class_transform: () => class_transform,
  defineAdoNodeConfig: () => defineAdoNodeConfig,
  defineAdoNodeOptions: () => defineAdoNodeOptions,
  del: () => del,
  gerRedis: () => gerRedis,
  getConnection: () => getConnection,
  query: () => query,
  ref: () => ref,
  save: () => save,
  update: () => update,
  validate: () => validate
});
module.exports = __toCommonJS(ado_node_exports);

// lib/error/client.ts
var ClientError = class extends Error {
  name = "ClientError";
  code = -1 /* ERROR */;
  message;
  constructor(message) {
    super(message);
    this.message = message;
  }
  static RetClientError(message) {
    const data = new ClientError(message);
    return {
      code: -1 /* ERROR */,
      message: "error" /* ERROR */,
      data
    };
  }
};

// lib/error/dababase.ts
var DataBaseError = class extends Error {
  name = "DataBaseError";
  code = -1 /* ERROR */;
  detail;
  constructor(message, detail) {
    super(message);
    this.detail = detail;
  }
};

// lib/error/field.ts
var FieldError = class extends Error {
  name = "FieldError";
  code = -2 /* FIELDERROR */;
  message;
  constructor(message) {
    super(message);
    this.message = message;
  }
  static RetFieldError(message) {
    const data = new FieldError(message);
    return {
      code: -2 /* FIELDERROR */,
      message: "missing field" /* FIELDERROR */,
      data
    };
  }
};

// lib/error/type.ts
var TypesError = class extends Error {
  name = "TypeError";
  code = -3 /* TYPEERROR */;
  message;
  constructor(message) {
    super(message);
    this.message = message;
  }
  static RetTypeError(message) {
    const data = new TypesError(message);
    return {
      code: -3 /* TYPEERROR */,
      message: "type error" /* TypeError */,
      data
    };
  }
};

// lib/ioc/class.ts
var express = __toESM(require("express"));

// lib/ioc/ref.ts
var import_reflect_metadata = require("reflect-metadata");
var ref = {
  def: function(key, value, target, propertyKey) {
    if (key instanceof Function) {
      Reflect.defineMetadata(key.name, value, key.prototype);
    } else {
      if (target && propertyKey) {
        Reflect.defineMetadata(key, value, target, propertyKey);
      }
      if (target && !propertyKey) {
        Reflect.defineMetadata(key, value, target);
      }
    }
  },
  get: function(key, target, propertyKey) {
    if (propertyKey && target) {
      return Reflect.getMetadata(key, target, propertyKey);
    }
    if (typeof key == "string") {
      if (target) {
        return Reflect.getMetadata(key, target);
      } else {
        return Reflect.getMetadata(key, key);
      }
    } else {
      return Reflect.getMetadata(key.name, key.prototype);
    }
  }
};

// lib/ioc/class.ts
var Boost = Symbol("Boost");
var AdoNodeController = class {
  constructor(Base, Service) {
    this.Base = Base;
    this.Service = Service;
  }
  [Boost](Base) {
    const AdoNodeGlobalInterceptor = ref.get(
      Base.name,
      Base.prototype,
      ":ControllerInterceptor"
    );
    const app = express.Router();
    this.Service.forEach((service, URL2) => {
      let fn = service.fn;
      service.fn = async function(req, res) {
        if (AdoNodeGlobalInterceptor) {
          if (AdoNodeGlobalInterceptor.before) {
            const data = await AdoNodeGlobalInterceptor.before(req);
            if (data) {
              res.json(data);
              return;
            }
          }
          const ret = await fn(req, res);
          if (ret instanceof Error) {
            res.json(ret);
            return;
          }
          if (ret.data && ret.after) {
            res.json(ret.data);
            ret.after(req, res);
            return;
          } else if (ret.data && !ret.after) {
            res.json(ret.data);
            return;
          }
          if (ret) {
            res.json(ret);
            return;
          }
          if (AdoNodeGlobalInterceptor.after) {
            AdoNodeGlobalInterceptor.after(req);
          }
          return;
        } else {
          const ret = await fn(req, res);
          if (ret instanceof Error) {
            res.json(ret);
            return;
          }
          if (ret.data && ret.after) {
            res.json(ret.data);
            ret.after(req, res);
            return;
          } else if (ret.data && !ret.after) {
            res.json(ret.data);
            return;
          }
          if (ret) {
            res.json(ret);
            return;
          }
          return;
        }
      };
      if (service.method == "Get") {
        URL2 = this.Base + URL2;
        app.get(URL2, service.fn);
      }
      if (service.method == "Post") {
        URL2 = this.Base + URL2;
        app.post(URL2, service.fn);
      }
      if (service.method == "All") {
        app.all(URL2, service.fn);
      }
      console.log("url", URL2);
    });
    return app;
  }
};

// lib/ioc/service.ts
var SerivceMap = /* @__PURE__ */ new Map();
function GenereateRouter(Controller2) {
  const URL2 = ref.get("BaseUrl", Controller2.prototype);
  const GetService = new Controller2(URL2, SerivceMap);
  return GetService[Boost](Controller2);
}

// lib/ioc/controller.ts
var Controller = (BaseUrl) => {
  return (target) => {
    ref.def("BaseUrl", BaseUrl, target.prototype);
    ref.def(target, GenereateRouter(target.prototype.constructor));
    SerivceMap.clear();
  };
};

// lib/ioc/ioc.ts
var import_reflect_metadata2 = require("reflect-metadata");
var Inject = (InjectTarget) => {
  return function(target, propertyKey) {
    let Service = ref.get(InjectTarget);
    target.constructor.prototype[propertyKey] = Service;
  };
};
var Collect = () => {
  return function(target) {
    ref.def(target, target.prototype);
  };
};

// lib/interceptor/global.ts
var UseControllerInterceptor = (fn) => {
  return function(target) {
    ref.def(target.name, fn, target.prototype, ":ControllerInterceptor");
  };
};

// lib/interceptor/interceptor.ts
var UseInterceptor = (fn) => {
  return function(target, propertyKey) {
    ref.def(
      propertyKey,
      fn,
      target.constructor.prototype,
      ":interceptor"
    );
  };
};

// lib/method/method.ts
function useRunTimeInterceptor(Interceptor, time, options) {
  if (Interceptor) {
    if (Interceptor[time]) {
      return Interceptor[time](options.req);
    }
  }
  return void 0;
}
function useArgs(propertyKey, target, req, res) {
  const hasQuery = ref.get(
    propertyKey,
    target.constructor.prototype,
    ":query"
  );
  const hasBody = ref.get(
    propertyKey,
    target.constructor.prototype,
    ":body"
  );
  const hasParams = ref.get(
    propertyKey,
    target.constructor.prototype,
    ":params"
  );
  const hasHeaders = ref.get(
    propertyKey,
    target.constructor.prototype,
    ":headers"
  );
  const hasRequest = ref.get(
    propertyKey,
    target.constructor.prototype,
    ":request"
  );
  const hasResponse = ref.get(
    propertyKey,
    target.constructor.prototype,
    ":response"
  );
  let arg = [];
  if (typeof hasQuery === "number" || typeof hasBody === "number" || typeof hasHeaders === "number" || typeof hasRequest == "number" || typeof hasResponse == "number" || typeof hasParams == "number") {
    arg[hasQuery] = req.query;
    arg[hasBody] = req.body;
    arg[hasParams] = req.params;
    arg[hasHeaders] = req.headers;
    arg[hasRequest] = req;
    arg[hasResponse] = res;
    return arg;
  }
  return [req, res];
}
var createMethod = (method) => {
  return (URL2) => {
    return function(target, propertyKey, descriptor) {
      const fn = descriptor.value;
      ref.def(propertyKey, URL2, target.constructor.prototype, ":url");
      descriptor.value = async function(req, res) {
        target.constructor.prototype[propertyKey] = fn;
        const interceptor = ref.get(
          propertyKey,
          target.constructor.prototype,
          ":interceptor"
        );
        const before_data = await useRunTimeInterceptor(interceptor, "before", {
          req
        });
        console.log(before_data);
        if (before_data) {
          return before_data;
        }
        const pipe = ref.get(
          propertyKey,
          target.constructor.prototype,
          ":pipe"
        );
        if (pipe) {
          const pipe_data = await pipe.run(req);
          if (pipe_data) {
            return pipe_data;
          }
        }
        const hack_data = await useRunTimeInterceptor(interceptor, "hack", {
          req
        });
        if (hack_data) {
          return hack_data;
        }
        const args = useArgs(propertyKey, target, req, res);
        const ret = await target.constructor.prototype[propertyKey](...args);
        if (ret && interceptor && interceptor.after) {
          return {
            data: ret,
            after: interceptor.after
          };
        }
        if (ret && !interceptor) {
          return {
            data: ret
          };
        }
        return {
          msg: "ok",
          code: 0
        };
      };
      SerivceMap.set(URL2, {
        fn: descriptor.value,
        method
      });
    };
  };
};
var Get = createMethod("Get");
var Post = createMethod("Post");
var All = createMethod("All");

// lib/method/server.ts
var import_express = __toESM(require("express"));
var import_os = require("os");
var import_cluster = __toESM(require("cluster"));
function defineAdoNodeOptions(options) {
  return options;
}
var _AdoNodeServer = class {
  static __getProvider__(provider) {
    if (provider.length && provider.length >= 1) {
      provider.forEach((el) => {
        const controller = ref.get(el.name, el.prototype, ":controller");
        const provider2 = ref.get(el.name, el.prototype, ":provider");
        this.__getProvider__(provider2);
        if (controller.length && controller.length >= 1 && controller instanceof Array) {
          controller.forEach((el2) => {
            this.Controllers.push(el2);
          });
        }
      });
    }
  }
  static createControllers() {
    const opt = ref.get(
      _AdoNodeServer.name,
      _AdoNodeServer.prototype,
      ":modules"
    );
    opt.forEach((el) => {
      const controller = ref.get(el.name, el.prototype, ":controller");
      const provider = ref.get(el.name, el.prototype, ":provider");
      this.__getProvider__(provider);
      if (controller.length && controller.length >= 1 && controller instanceof Array) {
        controller.forEach((el2) => {
          this.Controllers.push(el2);
        });
      }
    });
    const Controller2 = [...new Set(this.Controllers)];
    return Controller2;
  }
  static run() {
    const isCluster = ref.get(
      _AdoNodeServer.name,
      _AdoNodeServer.prototype,
      ":cluster"
    );
    if (isCluster) {
      let workers = {};
      if (import_cluster.default.isPrimary) {
        import_cluster.default.on("exit", (worker, _code, _signal) => {
          console.log(`\u5DE5\u4F5C\u8FDB\u7A0B ${worker.process.pid} \u5DF2\u9000\u51FA`);
          delete workers[worker.process.pid];
          worker = import_cluster.default.fork();
          workers[worker.process.pid] = worker;
        });
        for (let i = 0; i < (0, import_os.cpus)().length; i++) {
          let worker = import_cluster.default.fork();
          workers[worker.process.pid] = worker;
        }
      } else {
        this.runServer();
      }
    } else {
      this.runServer();
    }
  }
  static runServer() {
    const app = (0, import_express.default)();
    const globalPipes = ref.get(
      _AdoNodeServer.name,
      _AdoNodeServer.prototype,
      ":globalPipes"
    );
    app.use(import_express.default.json());
    if (globalPipes && globalPipes.length && globalPipes instanceof Array) {
      globalPipes.forEach((pipe) => {
        const inst = new pipe();
        app.use("*", inst.run);
      });
    }
    const port = ref.get(_AdoNodeServer.name, _AdoNodeServer.prototype, ":port");
    const base = ref.get(_AdoNodeServer.name, _AdoNodeServer.prototype, ":base");
    const controller = this.createControllers();
    controller.forEach((el) => {
      const router = ref.get(el);
      app.use(base, router);
    });
    app.set("port", port);
    app.listen(port, () => {
      console.log(
        `create server at  http://localhost:${port} Worker ${process.pid} started`
      );
    });
  }
  static async runSSRServer(callBack) {
    const app = (0, import_express.default)();
    const globalPipes = ref.get(
      _AdoNodeServer.name,
      _AdoNodeServer.prototype,
      ":globalPipes"
    );
    const hasRpcClient = ref.get(
      _AdoNodeServer.name,
      _AdoNodeServer.prototype,
      ":rpc-client"
    );
    console.log(hasRpcClient);
    if (typeof hasRpcClient == "function") {
      hasRpcClient(app);
    }
    app.use(import_express.default.json());
    if (globalPipes && globalPipes.length && globalPipes instanceof Array) {
      globalPipes.forEach((pipe) => {
        const inst = new pipe();
        app.use("*", inst.run);
      });
    }
    const base = ref.get(_AdoNodeServer.name, _AdoNodeServer.prototype, ":base");
    const port = ref.get(_AdoNodeServer.name, _AdoNodeServer.prototype, ":port");
    const controller = this.createControllers();
    controller.forEach((el) => {
      const router = ref.get(el);
      app.use(base, router);
    });
    callBack(app);
    app.listen(port, () => {
      console.log(
        `create server at  http://localhost:${port} Worker ${process.pid} started`
      );
    });
  }
};
var AdoNodeServer = _AdoNodeServer;
__publicField(AdoNodeServer, "Controllers", []);

// lib/module/module.ts
var Module = (AdoNodeOptions) => {
  return function(target) {
    ref.def(
      target.name,
      AdoNodeOptions.Controller,
      target.prototype,
      ":controller"
    );
    ref.def(
      target.name,
      AdoNodeOptions.Provider,
      target.prototype,
      ":provider"
    );
    ref.def(target.name, true, target.prototype, ":module");
  };
};
var Modules = (modules) => {
  modules.Modules.forEach((el) => {
    const isModule = ref.get(el.name, el.prototype, ":module");
    if (!isModule) {
      throw new Error(`${el.name} is Not a Moudle`);
    }
  });
  return function() {
    ref.def(
      AdoNodeServer.name,
      modules.Modules,
      AdoNodeServer.prototype,
      ":modules"
    );
    ref.def(AdoNodeServer.name, modules.Base, AdoNodeServer.prototype, ":base");
    ref.def(
      AdoNodeServer.name,
      modules.GlobalPipes,
      AdoNodeServer.prototype,
      ":globalPipes"
    );
    ref.def(AdoNodeServer.name, modules.Port, AdoNodeServer.prototype, ":port");
    ref.def(
      AdoNodeServer.name,
      modules.Cluster,
      AdoNodeServer.prototype,
      ":cluster"
    );
  };
};

// lib/orm/conn.ts
var mysql = __toESM(require("mysql"));
var import_redis = require("redis");
function defineAdoNodeConfig(config) {
  return config;
}
var _Connection = class {
  static async readConfig() {
    const config = process.cwd() + "/ado.config.js";
    const data = await import(config);
    await _Connection.createConnection(data);
  }
  static async createConnection(configInfo) {
    const config = configInfo.default.database;
    _Connection.connectionPool = await mysql.createPool({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database,
      port: config.port,
      connectionLimit: config.connectionLimit
    });
  }
  static async getConnection() {
    if (!_Connection.connectionPool) {
      await _Connection.readConfig();
    }
    return new Promise((resolve, reject) => {
      var _a;
      (_a = _Connection.connectionPool) == null ? void 0 : _a.getConnection((err, connection) => {
        if (err) {
          reject(err);
        }
        resolve(connection);
      });
    });
  }
};
var Connection = _Connection;
__publicField(Connection, "connectionPool");
function getConnection() {
  return Connection.connectionPool;
}
async function gerRedis() {
  return await (0, import_redis.createClient)();
}

// lib/orm/symbol.ts
var FilterFields = Symbol("FilterFields");
var IsEqual = Symbol("IsEqual");
var GetCache = Symbol("GetCache");
var RunConfig = Symbol("RUNCONFIG");
var BASEENITY = Symbol("BASEENITY");
var Conn = Symbol("CONN");
var Target = Symbol("TARGET");
var GetConn = Symbol("GETCONN");
var TableName = Symbol("TableName");
var Cache = Symbol("CACHE");
var RedisClient = Symbol("RedisClient");
var BF__INSERT = Symbol("bf-insert");
var BF__DELETE = Symbol("bf-delete");
var BF__UPDATE = Symbol("bf-update");
var VoidFunction = Symbol("void-function");

// lib/orm/enity.ts
var Entity = (dbname) => {
  return function(target) {
    const targetInst = new target();
    ref.def(target.name, targetInst, target.prototype);
    ref.def(":tablename", dbname, target.prototype);
    targetInst[RunConfig](target, dbname);
  };
};
var Key = (target, propertyKey) => {
  ref.def("key", propertyKey, target.constructor.prototype);
};
var Index = (target, propertyKey) => {
  ref.def("index", propertyKey, target.constructor.prototype);
};
var Keyword = (target, propertyKey) => {
  ref.def("keyword", propertyKey, target.constructor.prototype);
};
var AutoCreate = (target, propertyKey) => {
  const getPrevAutoCreate = ref.get(
    "AutoCreate" /* AutoCreate */,
    target.constructor.prototype
  );
  if (!getPrevAutoCreate) {
    ref.def(
      "AutoCreate" /* AutoCreate */,
      [propertyKey],
      target.constructor.prototype
    );
  } else {
    getPrevAutoCreate.push(propertyKey);
    ref.def(
      "AutoCreate" /* AutoCreate */,
      getPrevAutoCreate,
      target.constructor.prototype
    );
  }
};
var IsEmail = (target, propertyKey) => {
  const EmailValidate = (data) => {
    const reg = /[\w]+(\.[\w]+)*@[\w]+(\.[\w])+/;
    return reg.test(data);
  };
  ref.def(propertyKey, EmailValidate, target.constructor.prototype);
};
var IsNumber = (target, propertyKey) => {
  const IsNum = (num) => {
    return !isNaN(num);
  };
  ref.def(propertyKey, IsNum, target.constructor.prototype);
};
var IsOptional = (target, propertyKey) => {
  const RetTrue = () => true;
  ref.def(propertyKey, RetTrue, target.constructor.prototype);
};

// lib/orm/monitor.ts
var BeforeInsert = (target, _propertyKey, descriptor) => {
  const val = descriptor.value;
  ref.def("monitor", val, target.constructor.prototype, ":before-insert");
};
var BeforeDelete = (target, _propertyKey, descriptor) => {
  const val = descriptor.value;
  ref.def("monitor", val, target.constructor.prototype, ":before-delete");
};
var BeforeUpdate = (target, _propertyKey, descriptor) => {
  const val = descriptor.value;
  ref.def("monitor", val, target.constructor.prototype, ":before-update");
};

// lib/oper/protect.ts
function getStrCount(aStr, aChar) {
  let result;
  let count = 0;
  if (typeof aChar === "string") {
    let regex = new RegExp(aChar, "g");
    result = aStr.match(regex);
    count = !result ? 0 : result.length;
  }
  if (aChar instanceof Array) {
    aChar.forEach((el) => {
      let regex = new RegExp(el, "g");
      result = aStr.match(regex);
      result = !result ? 0 : result.length;
      count += result;
    });
  }
  return count;
}

// lib/orm/orm.ts
var import_redis2 = require("redis");
var import_lodash = require("lodash");
var __ = __toESM(require("lodash"));

// lib/orm/sql.ts
var query = class {
  sql = "";
  Entity = "";
  and_sql = "";
  or_sql = "";
  likeand_sql = "";
  likeor_sql = "";
  pagination_sql = "";
  column_sql = "";
  setEntity(Entity2) {
    if (Entity2 instanceof Array) {
      this.Entity = Entity2.join(",");
    } else {
      this.Entity = Entity2;
    }
    return this;
  }
  setColumn(keys) {
    let columns = "";
    this.sql = "";
    columns = keys.join(",");
    this.column_sql = columns;
    this.column_sql = this.column_sql + " from ";
    return this;
  }
  and(options, value) {
    if (value) {
      this.and_sql = options + " = " + value;
    } else {
      const option = Object.entries(options);
      const sql2 = option.join(" and ").replaceAll(",", " = ");
      this.and_sql = sql2;
    }
    return this;
  }
  or(options, value) {
    if (value) {
      this.or_sql = options + " = " + value;
    } else {
      const option = Object.entries(options);
      const sql2 = option.join(" or ").replaceAll(",", " = ");
      this.or_sql = sql2;
    }
    return this;
  }
  like_or(options, value) {
    if (value) {
      this.likeor_sql = options + " like " + value;
    } else {
      const option = Object.entries(options);
      const sql2 = option.join(" or ").replaceAll(",", " like ");
      this.likeor_sql = sql2;
    }
    return this;
  }
  like_and(options, value) {
    if (value) {
      this.likeand_sql = options + " like " + value;
    } else {
      const option = Object.entries(options);
      const sql2 = option.join(" or ").replaceAll(",", " like ");
      this.likeand_sql = sql2;
    }
    return this;
  }
  pagination(page, size2) {
    this.pagination_sql += page + "," + size2;
    this.pagination_sql = " limit " + this.pagination_sql;
    return this;
  }
  getSql() {
    let andor = "";
    let like_andor = "";
    if (this.and_sql || this.or_sql) {
      andor = this.and_sql ? this.and_sql : this.or_sql;
      andor = " where " + andor;
      if (this.and_sql && this.or_sql) {
        andor = " where " + this.and_sql + " or " + this.or_sql + " ";
      }
    }
    if (this.likeand_sql || this.likeor_sql) {
      like_andor = this.likeand_sql ? this.likeand_sql : this.likeor_sql;
      if (this.likeand_sql && this.likeor_sql) {
        like_andor = this.likeand_sql + " or " + this.likeor_sql + " ";
      }
      if (!andor) {
        like_andor = " where " + like_andor;
      }
    }
    if (!this.column_sql) {
      this.column_sql = " * from ";
    }
    this.sql = "select" + this.column_sql + this.Entity + andor + like_andor + this.pagination_sql;
    return this.sql;
  }
};
var del = class {
  sql = "select";
  Entity = "";
  andsql = "";
  orsql = "";
  setEntity(Entity2) {
    if (typeof Entity2 === "function") {
      this.Entity = Entity2.name;
    } else {
      this.Entity = Entity2;
    }
    this.sql = "delete from " + this.Entity + " ";
    return this;
  }
  and(options, value) {
    if (value) {
      if (!this.andsql) {
        this.andsql += " where ";
      } else {
        this.andsql = "";
        this.andsql += " and ";
      }
      this.andsql += options + ' = "' + value + '"';
      this.sql += this.andsql;
    }
    if (typeof options == "object") {
      const entries = Object.keys(options);
      entries.forEach((el) => {
        this.and(el, options[el]);
      });
    }
    return this;
  }
  or(options, value) {
    if (value) {
      if (!this.orsql) {
        this.orsql += " where ";
      } else {
        this.orsql = "";
        this.orsql += " or ";
      }
      this.orsql += options + ' = "' + value + '"';
      this.sql += this.orsql;
    }
    if (typeof options == "object") {
      const entries = Object.keys(options);
      entries.forEach((el) => {
        this.or(el, options[el]);
      });
    }
    return this;
  }
  getSql() {
    return this.sql;
  }
};
var update = class {
  Entity;
  sql = "";
  options = {};
  orsql = "";
  andsql = "";
  setEntity(Entity2) {
    if (typeof Entity2 === "function") {
      this.Entity = Entity2.name;
    } else {
      this.Entity = Entity2;
    }
    return this;
  }
  setOptions(options, value) {
    if (value && typeof options == "string") {
      console.log(this.options);
      this.options[options] = value;
    } else {
      const entries = Object.keys(options);
      entries.forEach((el) => {
        this.setOptions(el, options[el]);
      });
    }
    return this;
  }
  or(options, value) {
    if (value) {
      if (!this.andsql && !this.orsql) {
        this.orsql += " where ";
      } else {
        this.orsql = " ";
        this.orsql += " or ";
      }
      this.orsql += options + ' = "' + value + '"';
      this.sql += this.orsql;
      return this;
    }
    if (typeof options == "object") {
      const entries = Object.keys(options);
      entries.forEach((el) => {
        this.or(el, options[el]);
      });
    }
    return this;
  }
  and(options, value) {
    if (value) {
      if (!this.andsql && !this.orsql) {
        this.andsql += " where ";
      } else {
        this.andsql = " ";
        this.andsql += " and ";
      }
      this.andsql += options + ' = "' + value + '"';
      this.sql += this.andsql;
      return this;
    }
    if (typeof options == "object") {
      const entries = Object.keys(options);
      entries.forEach((el) => {
        this.and(el, options[el]);
      });
    }
    return this;
  }
  getSql() {
    const opt = [this.options];
    console.log("this.sql", this.sql);
    const sql2 = "update  " + this.Entity + " Set ? " + this.sql;
    return {
      opt,
      sql: sql2
    };
  }
};
var save = class {
  sql = "";
  Entity = "";
  options = {};
  setEntity(Entity2) {
    if (typeof Entity2 === "function") {
      this.Entity = Entity2.name;
    } else {
      this.Entity = Entity2;
    }
    return this;
  }
  setOptions(options, value) {
    if (value && typeof options == "string") {
      console.log(this.options);
      this.options[options] = value;
    } else {
      const entries = Object.keys(options);
      entries.forEach((el) => {
        this.setOptions(el, options[el]);
      });
    }
    return this;
  }
  getSql() {
    const opt = [this.options];
    console.log("this.sql", this.sql);
    const sql2 = "insert into  " + this.Entity + " SET ? ";
    return {
      opt,
      sql: sql2
    };
  }
};

// lib/orm/transaction.ts
var transaction = class {
  __that__;
  conn;
  __manager__;
  constructor() {
    this.__manager__ = [];
  }
  async connection() {
    this.conn = await this.__that__[Conn];
  }
  async start() {
    return new Promise((resolve, reject) => {
      this.conn.beginTransaction((err) => {
        if (err) {
          reject(err);
        }
        Promise.all(this.__manager__.map(async (el) => await el())).then((res) => {
          console.log("res", res);
          this.conn.commit((err2) => {
            if (err2) {
              console.log("\u4E8B\u7269\u63D0\u4EA4\u5931\u8D25");
              reject(err2);
            }
          });
          resolve(res);
        }).catch((err2) => {
          console.log("err", err2);
          this.conn.rollback(() => {
            console.log("\u6570\u636E\u64CD\u4F5C\u56DE\u6EDA");
          });
          reject(err2);
        });
      });
    });
  }
  async TransactionError(msg) {
    return Promise.reject(msg);
  }
  push(fn) {
    this.__manager__.push(fn);
  }
};

// lib/orm/orm.ts
function void_fn() {
}
var AdoOrmBaseEntity = class {
  [BASEENITY];
  [Conn];
  [Target];
  [TableName];
  [RedisClient];
  [BF__DELETE];
  [BF__INSERT];
  [BF__UPDATE];
  [VoidFunction]() {
  }
  constructor() {
    this[Target] = AdoOrmBaseEntity.name;
    this[RedisClient] = (0, import_redis2.createClient)();
    this[RedisClient].connect();
  }
  createTransaction() {
    const TranSactionInstance = new transaction();
    TranSactionInstance.__that__ = this;
    return TranSactionInstance;
  }
  createQueryBuilder() {
    return {
      query: new query(),
      save: new save(),
      update: new update(),
      del: new del()
    };
  }
  cache(cacheOptions2, VAL) {
    return this[Cache](cacheOptions2, VAL);
  }
  async [GetCache](cacheOptions2) {
    const isCache = (0, import_lodash.isObject)(cacheOptions2) && cacheOptions2.cache;
    if (isCache) {
      let cacheVal = await this[RedisClient].get(cacheOptions2.key);
      if (cacheVal) {
        return cacheVal;
      }
    }
    return;
  }
  async [RunConfig](BaseEnity, dbname) {
    try {
      this[Conn] = await Connection.getConnection();
    } catch (e) {
      throw e;
    }
    this[BASEENITY] = BaseEnity;
    this[TableName] = dbname;
    const bf_destory = ref.get(
      "monitor",
      this[BASEENITY].prototype,
      ":before-delete"
    );
    this[BF__DELETE] = bf_destory != void 0 ? bf_destory : void_fn;
    const bf_insert = ref.get(
      "monitor",
      this[BASEENITY].prototype,
      ":before-insert"
    );
    this[BF__INSERT] = bf_insert != void 0 ? bf_insert : void_fn;
    const bf_update = ref.get(
      "monitor",
      this[BASEENITY].prototype,
      ":before-update"
    );
    this[BF__UPDATE] = bf_update != void 0 ? bf_update : void_fn;
  }
  async [Cache](cacheOptions2, value) {
    const { key, timeout, cache } = cacheOptions2;
    let tocacheVal = "";
    if (typeof value == "string") {
      tocacheVal = value;
    }
    if (typeof value == "number") {
      tocacheVal = String(value);
    }
    if ((0, import_lodash.isObject)(value)) {
      tocacheVal = JSON.stringify(value);
    }
    if (cache) {
      this[RedisClient].set(key, tocacheVal);
      if (timeout) {
        this[RedisClient].expire(key, timeout);
      }
    }
  }
  async getList(page, size2) {
    return new Promise((resolve, reject) => {
      this[Conn].query(
        " select * from ?? limit ?,? ",
        [this[TableName], parseInt(page), parseInt(size2)],
        function(err, res) {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  async getOneBy(val, cache) {
    {
      if (cache) {
        const data = await this[GetCache](cache);
        if (data) {
          return data;
        }
      }
      const key = ref.get("key", this[BASEENITY].prototype);
      const count = getStrCount(val, ["delete", "drop"]);
      if (count) {
        return new ClientError("\u975E\u6CD5\u53C2\u6570,\u53EF\u80FD\u4E3A\u6076\u610Fsql\u6CE8\u5165");
      }
      return new Promise((resolve) => {
        let that = this;
        this[Conn].query(
          `select * from ?? where ?? = ?`,
          [this[TableName], key, val],
          function(err, res) {
            if (err) {
              resolve(new DataBaseError("\u6570\u636E\u5E93\u9519\u8BEF,\u4E5F\u8BB8\u914D\u7F6E\u9879\u662F\u975E\u6CD5\u7684", err));
            }
            resolve(res);
            if (cache) {
              that[Cache](cache, res);
            }
          }
        );
      });
    }
  }
  async delOneBy(val) {
    const isbreak = await this[BF__DELETE](val);
    if (isbreak) {
      return isbreak;
    }
    const key = ref.get("key", this[BASEENITY].prototype);
    return new Promise((resolve, reject) => {
      this[Conn].query(
        `DELETE FROM ?? WHERE ?? = ?`,
        [this[TableName], key, val],
        function(err, res) {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  async countBy(val, cache) {
    if (cache) {
      const data = await this[GetCache](cache);
      if (data) {
        return data;
      }
    }
    let countSql = `select count(*) as total from ?? where `;
    const jonitSql = this[Conn].escape(val).replaceAll(",", " and ");
    return new Promise((resolve, reject) => {
      let that = this;
      this[Conn].query(
        countSql + jonitSql,
        [this[TableName]],
        function(err, res) {
          if (err) {
            reject(err);
          }
          const data = res[0];
          resolve(data);
          if (cache) {
            that[Cache](cache, res);
          }
        }
      );
    });
  }
  async getBy(val, cache) {
    if (cache) {
      const data = await this[GetCache](cache);
      if (data) {
        return data;
      }
    }
    const sql2 = this[Conn].escape(val).replaceAll(",", " and ");
    return new Promise((resolve, reject) => {
      let that = this;
      this[Conn].query(
        "select * from ?? where " + sql2,
        [this[TableName]],
        function(err, res) {
          if (err) {
            reject(err);
          }
          resolve(res);
          if (cache) {
            that[Cache](cache, res);
          }
        }
      );
    });
  }
  async save(val) {
    const fval = JSON.parse(JSON.stringify(val));
    const isbreak = await this[BF__INSERT].call(val);
    if (isbreak) {
      return isbreak;
    }
    return new Promise((resolve, reject) => {
      this[Conn].query(
        `insert into ??  SET ? `,
        [this[TableName], fval],
        function(err, res) {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  async update(val) {
    this[BF__UPDATE].call(val);
    const key = ref.get("key", this[BASEENITY].prototype);
    const keyVal = val[key];
    const filterVal = __.omit(val, key);
    return new Promise((resolve, reject) => {
      this[Conn].query(
        `update  ??  SET ? where ?? = ?`,
        [this[TableName], filterVal, key, keyVal],
        function(err, res) {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  async getMany(sql2, options, cache) {
    if (cache) {
      const data = await this[GetCache](cache);
      if (data) {
        return data;
      }
    }
    return new Promise((resolve, reject) => {
      let that = this;
      this[Conn].query(sql2, options, function(err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
          if (cache) {
            that[Cache](cache, res);
          }
        }
      });
    });
  }
};
var AdoOrmBaseView = class {
  ViewFields;
  ViewName;
  [RedisClient];
  [BASEENITY];
  [Conn];
  constructor() {
    this.ViewFields = [];
    this.ViewName = "";
    this[RedisClient] = (0, import_redis2.createClient)();
    this[RedisClient].connect();
  }
  async [RunConfig](Entity2) {
    const inst = ref.get(Entity2.name, Entity2.prototype);
    this.ViewName = ref.get(":view_name", Entity2.prototype);
    this.ViewFields = Object.keys(inst);
    this[BASEENITY] = Entity2;
    try {
      this[Conn] = await Connection.getConnection();
    } catch (e) {
      throw e;
    }
  }
  async [Cache](cacheOptions2, value) {
    const { key, timeout, cache } = cacheOptions2;
    let tocacheVal = "";
    if (typeof value == "string") {
      tocacheVal = value;
    }
    if (typeof value == "number") {
      tocacheVal = String(value);
    }
    if ((0, import_lodash.isObject)(value)) {
      tocacheVal = JSON.stringify(value);
    }
    if (cache) {
      this[RedisClient].set(key, tocacheVal);
      if (timeout) {
        this[RedisClient].expire(key, timeout);
      }
    }
  }
  async [GetCache](cacheOptions2) {
    const isCache = (0, import_lodash.isObject)(cacheOptions2) && cacheOptions2.cache;
    if (isCache) {
      let cacheVal = await this[RedisClient].get(cacheOptions2.key);
      if (cacheVal) {
        return cacheVal;
      }
    }
    return;
  }
  async getList(page, size2) {
    return new Promise((resolve, reject) => {
      this[Conn].query(
        " select * from ?? limit ?,? ",
        [this.ViewName, parseInt(page), parseInt(size2)],
        function(err, res) {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  async getOneBy(val, cache) {
    {
      if (cache) {
        const data = await this[GetCache](cache);
        if (data) {
          return data;
        }
      }
      const index = ref.get("index", this[BASEENITY].prototype);
      const count = getStrCount(val, ["delete", "drop"]);
      if (count) {
        return new ClientError("\u975E\u6CD5\u53C2\u6570,\u53EF\u80FD\u4E3A\u6076\u610Fsql\u6CE8\u5165");
      }
      return new Promise((resolve) => {
        let that = this;
        this[Conn].query(
          `select * from ?? where ?? = ?`,
          [this.ViewName, index, val],
          function(err, res) {
            if (err) {
              resolve(new DataBaseError("\u6570\u636E\u5E93\u9519\u8BEF,\u4E5F\u8BB8\u914D\u7F6E\u9879\u662F\u975E\u6CD5\u7684", err));
            }
            resolve(res);
            if (cache) {
              that[Cache](cache, res);
            }
          }
        );
      });
    }
  }
  async countBy(val, cache) {
    if (cache) {
      const data = await this[GetCache](cache);
      if (data) {
        return data;
      }
    }
    let countSql = `select count(*) as total from ?? where `;
    const jonitSql = this[Conn].escape(val).replaceAll(",", " and ");
    return new Promise((resolve, reject) => {
      let that = this;
      this[Conn].query(
        countSql + jonitSql,
        [this.ViewName],
        function(err, res) {
          if (err) {
            reject(err);
          }
          const data = res[0];
          resolve(data);
          if (cache) {
            that[Cache](cache, res);
          }
        }
      );
    });
  }
  async getBy(val, cache) {
    if (cache) {
      const data = await this[GetCache](cache);
      if (data) {
        return data;
      }
    }
    const sql2 = this[Conn].escape(val).replaceAll(",", " and ");
    return new Promise((resolve, reject) => {
      let that = this;
      this[Conn].query(
        "select * from ?? where " + sql2,
        [this.ViewName],
        function(err, res) {
          if (err) {
            reject(err);
          }
          resolve(res);
          if (cache) {
            that[Cache](cache, res);
          }
        }
      );
    });
  }
  async getMany(sql2, options, cache) {
    if (cache) {
      const data = await this[GetCache](cache);
      if (data) {
        return data;
      }
    }
    return new Promise((resolve, reject) => {
      let that = this;
      this[Conn].query(sql2, options, function(err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
          if (cache) {
            that[Cache](cache, res);
          }
        }
      });
    });
  }
};

// lib/oper/isArrayEqual.ts
var _ = __toESM(require("lodash"));
function isArrayEqual(array1, array2) {
  const isequal1 = _.differenceWith(array1, array2);
  const isequal2 = _.differenceWith(array2, array1);
  if (isequal1.length == isequal2.length) {
    return true;
  } else {
    return false;
  }
}

// lib/orm/view.ts
var import_chalk = __toESM(require("chalk"));
function GetViewFields(str) {
  let m;
  const regex = /AS `([^`]*)`/g;
  const values = [];
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    m.forEach((match, groupIndex) => {
      if (groupIndex === 1) {
        values.push(match);
      }
    });
  }
  return values;
}
var View = (options) => {
  const { engine } = options;
  return function(target) {
    const targetInst = new target();
    ref.def(target.name, targetInst, target.prototype);
    ref.def(":view_name", engine.view_name, target.prototype);
    targetInst[RunConfig](target);
    (async function() {
      const conn = await Connection.getConnection();
      conn.query("show create view " + engine.view_name, function(err, res) {
        if (err) {
          conn.query(engine.type + engine.engine_sql, function(err2) {
            if (err2) {
              console.log(err2);
            }
          });
        } else {
          if (options.migration) {
            const create_view_sql = res[0]["Create View"];
            let str = create_view_sql.split("AS select ")[1].split(" from ")[0];
            let fields = GetViewFields(str).map((el) => el.toLowerCase());
            let views_fields = engine.filter_fields.map((el) => {
              return el.split(".")[1];
            }).map((el) => el.toLowerCase());
            let isEqual = isArrayEqual(fields, views_fields);
            if (isEqual) {
              console.log(import_chalk.default.green("the view " + import_chalk.default.red(engine.view_name) + " does not need to migration"));
            } else {
              console.log(import_chalk.default.blue("the view " + import_chalk.default.red(engine.view_name) + "  need to migration"));
              const migration_sql = "Alter" + engine.engine_sql;
              conn.query(migration_sql, function(err2) {
                if (err2) {
                  throw err2;
                }
                console.log("the view " + import_chalk.default.red(engine.view_name) + " migration success");
              });
            }
          }
        }
      });
    })();
  };
};
var createView = class {
  ViewName;
  selectOptions;
  ViewFields;
  OmitFields;
  Entitys;
  FilterFields;
  constructor(ViewName) {
    this.ViewName = ViewName;
    this.selectOptions = "";
    this.ViewFields = [];
    this.OmitFields = [];
    this.Entitys = [];
    this.FilterFields = [];
  }
  [FilterFields]() {
    let filterFields = this.ViewFields.filter((view_field) => {
      let isOmit = this.OmitFields.some(
        (omit_field) => omit_field.toLowerCase() == view_field.toLowerCase()
      );
      return !isOmit;
    });
    this.FilterFields = filterFields;
    return filterFields.join(",");
  }
  [IsEqual](name1, name2) {
    if (typeof name1 == "string" && typeof name2 == "string") {
      if (name1.toLowerCase() == name2.toLocaleLowerCase()) {
        return true;
      } else {
        return false;
      }
    }
    throw new Error("args must be string");
  }
  omit(options) {
    if (typeof options == "string") {
      this.OmitFields.push(options);
      return this;
    }
    if (options instanceof Array) {
      this.OmitFields.push(...options);
      return this;
    }
    throw new Error("options must be typeof Array<string> or string");
  }
  create() {
    const get_fields = this[FilterFields]();
    const get_entitys = this.Entitys.join(",");
    let engine_sql = ` View ${this.ViewName} as Select ${get_fields} FROM ${get_entitys} where ${this.selectOptions}`;
    return {
      engine_sql,
      view_name: this.ViewName,
      filter_fields: this.FilterFields,
      type: "Create"
    };
  }
  addEntity(Entitys) {
    if (Entitys instanceof Array) {
      Entitys.forEach((AdoBaseEntity) => {
        let getFields = Object.getOwnPropertyNames(new AdoBaseEntity());
        let tablename = ref.get(":tablename", AdoBaseEntity.prototype);
        this.Entitys.push(tablename);
        getFields.forEach((field) => {
          let concrete_field = tablename + "." + field;
          this.ViewFields.push(concrete_field);
        });
      });
      return this;
    }
    throw new Error("Entitys must be Array<AdoOrmBaseEntity>");
  }
  addOptions(options) {
    if (typeof options == "string") {
      this.selectOptions = options;
      return this;
    }
    throw new Error("options must be string");
  }
};
function CreateView(ViewName) {
  const newView = new createView(ViewName);
  return newView;
}

// lib/params/params.ts
function Query() {
  return function(target, propertyKey, parameterIndex) {
    ref.def(
      propertyKey,
      parameterIndex,
      target.constructor.prototype,
      ":query"
    );
  };
}
function Body() {
  return function(target, propertyKey, parameterIndex) {
    ref.def(
      propertyKey,
      parameterIndex,
      target.constructor.prototype,
      ":body"
    );
  };
}
function Headers() {
  return function(target, propertyKey, parameterIndex) {
    ref.def(
      propertyKey,
      parameterIndex,
      target.constructor.prototype,
      ":headers"
    );
  };
}
function Req() {
  return function(target, propertyKey, parameterIndex) {
    ref.def(
      propertyKey,
      parameterIndex,
      target.constructor.prototype,
      ":request"
    );
  };
}
function Res() {
  return function(target, propertyKey, parameterIndex) {
    ref.def(
      propertyKey,
      parameterIndex,
      target.constructor.prototype,
      ":response"
    );
  };
}
function Params() {
  return function(target, propertyKey, parameterIndex) {
    ref.def(
      propertyKey,
      parameterIndex,
      target.constructor.prototype,
      ":params"
    );
  };
}

// lib/pipe/pipe.ts
var UsePipe = (fn) => {
  return function(target, propertyKey) {
    ref.def(propertyKey, fn, target.constructor.prototype, ":pipe");
  };
};
function validate(Proto, inst) {
  let errorfield = {};
  let Autocreate = ref.get("AutoCreate" /* AutoCreate */, Proto.prototype);
  if (!Autocreate) {
    Autocreate = [];
  }
  const getnames = Object.getOwnPropertyNames(new Proto());
  const filters = getnames.filter((el) => Autocreate.indexOf(el) == -1);
  const err = filters.some((el) => {
    let ret;
    const func = ref.get(el, Proto.prototype);
    if (func) {
      ret = func(inst[el]);
      if (!ret) {
        errorfield = {
          key: el,
          value: inst[el]
        };
        return true;
      }
      return false;
    }
    return false;
  });
  if (err) {
    return new FieldError(
      `${errorfield.key + " " + errorfield.value} \u5B58\u5728\u9519\u8BEF`
    );
  }
  return;
}

// lib/pipe/tansformer.ts
var __2 = __toESM(require("lodash"));
var class_transform = class {
  static plainToClass(toClass, plain) {
    if (plain instanceof Array) {
      let retPlain = plain.map((el) => {
        const inst = new toClass();
        return __2.assign(inst, el);
      });
      return retPlain;
    } else {
      const inst = new toClass();
      let retPlain = __2.assign(inst, plain);
      return retPlain;
    }
  }
  static __classToPlain__(get, inst) {
    const plain = {};
    get.forEach((el) => {
      plain[el] = inst[el];
    });
    return plain;
  }
  static classToPlain(classInst, options) {
    if (!options || options.exclude) {
      if (classInst instanceof Array) {
        let plain = classInst.map((inst) => {
          const filt = ref.get(
            "AutoCreate" /* AutoCreate */,
            inst.constructor.prototype
          );
          const keys = Object.getOwnPropertyNames(inst);
          const get = keys.map((el) => {
            return filt.indexOf(el) == -1 ? el : void 0;
          }).filter((el) => el);
          return this.__classToPlain__(get, inst);
        });
        return plain;
      } else {
        const filt = ref.get(
          "AutoCreate" /* AutoCreate */,
          classInst.constructor.prototype
        );
        const keys = Object.getOwnPropertyNames(classInst);
        const get = keys.map((el) => {
          return filt.indexOf(el) == -1 ? el : void 0;
        }).filter((el) => el);
        return this.__classToPlain__(get, classInst);
      }
    } else {
      if (classInst instanceof Array) {
        let plain = classInst.map((inst) => {
          const keys = Object.getOwnPropertyNames(inst).filter((el) => el);
          return this.__classToPlain__(keys, inst);
        });
        return plain;
      } else {
        const keys = Object.getOwnPropertyNames(classInst).filter((el) => el);
        return this.__classToPlain__(keys, classInst);
      }
    }
  }
};

// lib/rpc/event.ts
var import_net = require("net");
var _ArcEvent = class {
  events;
  constructor() {
    this.events = {};
  }
  register(Head, CallBack) {
    this.events[Head] = CallBack;
  }
  async emit(Head, ...args) {
    let head = Head.toString();
    return await this.events[head](...args);
  }
  static tcpRegister(key, value) {
    _ArcEvent.tcpConn[key] = value;
  }
  static getTcpConn(key) {
    if (_ArcEvent.tcpConn[key]) {
      return _ArcEvent.tcpConn[key];
    }
    const { port, host } = JSON.parse(key);
    const conn = (0, import_net.connect)({
      port,
      host
    });
    _ArcEvent.tcpRegister(key, conn);
    return conn;
  }
};
var ArcEvent = _ArcEvent;
__publicField(ArcEvent, "tcpConn", {});

// lib/rpc/client.ts
var ArcClient = class {
  Net;
  constructor(opts) {
    const { port, host } = opts;
    this.Net = ArcEvent.getTcpConn(JSON.stringify({ port, host }));
    this.Net.on("error", function(err) {
      console.log(err);
    });
  }
  call(pkg) {
    const { method, data, interFace, timeout } = pkg;
    let head = Buffer.alloc(100);
    let head_str = this.getRequestHead(interFace, method, String(timeout));
    head.write(head_str);
    let getRequestArgs = this.getRequestArgs(data);
    let body = Buffer.from(getRequestArgs);
    let call_buf = Buffer.concat([head, body]);
    return new Promise((resolve, reject) => {
      this.Net.write(call_buf, async (err) => {
        if (err) {
          console.log("write -err ", err);
          reject(err);
        }
        Promise.race([this.timeout(timeout), this.res()]).then((res) => {
          resolve(res);
        }).catch((err2) => {
          reject(err2);
        });
      });
    });
  }
  res() {
    return new Promise((resolve) => {
      this.Net.on("data", function(data) {
        console.log("data", data);
        resolve(data.toString());
      });
    });
  }
  getRequestArgs(args) {
    if (typeof args == "string") {
      return args;
    }
    if (args instanceof Array) {
      return JSON.stringify(args);
    }
    if (typeof args == "object") {
      let init = 0;
      let _args = "";
      for (let v in args) {
        let _ret = this.getRequestArgs(args[v]);
        _args += size[init++] + _ret;
      }
      _args += size[init];
      return _args;
    }
    return "";
  }
  getRequestHead(...args) {
    let head = "";
    args.forEach((item, index) => {
      head += proto[index] + item;
    });
    head += proto[proto.length - 1];
    return head;
  }
  timeout(timeout) {
    return new Promise((_2, rej) => {
      let _time = setTimeout(() => {
        rej("\u8BF7\u6C42\u8D85\u65F6");
        clearTimeout(_time);
      }, timeout);
    });
  }
};

// lib/rpc/controller.ts
var RpcClientController = (base, remote) => {
  const { interFace, url } = remote;
  let new_url = new URL(url);
  let socket = new ArcClient({
    host: String(new_url.hostname),
    port: Number(new_url.port)
  });
  return function(target) {
    ref.def(target.name, interFace, target.prototype, ":interFace");
    ref.def(target.name, url, target.prototype, ":remoteUrl");
    ref.def(target.name, base, target.prototype, ":base");
    ref.def(target.name, socket, target.prototype, ":socket");
  };
};
var RpcServerController = (interFace) => {
  return function(target) {
    const RegistEvents = {};
    const { name, prototype } = target;
    ref.def(name, interFace, prototype, ":interFace");
    ref.def(name, RegistEvents, prototype, ":events");
  };
};

// lib/rpc/bind.ts
var import_process = require("process");
var RpcClientMap = {};
var Call = (router, method) => {
  return function(target, propertyKey, descriptor) {
    (0, import_process.nextTick)(() => {
      let { name, prototype } = target.constructor;
      let fn = descriptor.value.bind(target.constructor.prototype);
      let interFace = ref.get(name, prototype, ":interFace");
      let socket = ref.get(name, prototype, ":socket");
      let base = ref.get(name, prototype, ":base");
      let timeout = ref.get(propertyKey, prototype, ":timeout");
      descriptor.value = async function(req, res) {
        const args = useArgs(propertyKey, target, req, res);
        let data = await fn(...args);
        let RemoteCallReq = {
          data,
          method,
          interFace,
          timeout: timeout ? timeout : 3e3
        };
        try {
          let RpcCallRes = await socket.call(RemoteCallReq);
          res.json(RpcCallRes);
        } catch (e) {
          console.log(e);
        }
      };
      if (!RpcClientMap[base]) {
        RpcClientMap[base] = [];
      }
      RpcClientMap[base].push({ [router]: descriptor.value });
    });
  };
};
var Timeout = (timeout) => {
  return function(target, propertyKey, _2) {
    const { prototype } = target.constructor;
    ref.def(propertyKey, timeout, prototype, ":timeout");
  };
};
var Register = (method) => {
  return function(target, _propertyKey, descriptor) {
    (0, import_process.nextTick)(() => {
      const { name, prototype } = target.constructor;
      const Events = ref.get(name, prototype, ":events");
      let fn = descriptor.value.bind(target);
      let interFace = ref.get(name, prototype, ":interFace");
      let fn_name = "[#1]" + interFace + "[#2]" + method;
      Events[fn_name] = fn;
    });
  };
};

// lib/rpc/run.ts
var import_express2 = __toESM(require("express"));

// lib/rpc/server.ts
var import_net2 = require("net");
var ArcServer = class {
  Net;
  socket;
  ArcEvent;
  constructor(opts) {
    const { port, host } = opts;
    this.createServer({ port, host });
    this.ArcEvent = new ArcEvent();
    console.log("server start at " + host + ":" + port);
  }
  registEvents(...args) {
    args.forEach((item) => {
      for (let k in item) {
        this.ArcEvent.register(k, item[k]);
      }
    });
  }
  createServer({ port, host }) {
    let bind_recieve = this.recieve.bind(this);
    this.Net = (0, import_net2.createServer)((socket) => {
      this.socket = socket;
      this.socket.on("data", bind_recieve);
      this.socket.on("error", this.error);
      this.socket.on("connection", this.connection);
      console.log("\u6709\u65B0\u7528\u6237\u94FE\u63A5");
    });
    this.Net.listen(port, host);
  }
  async recieve(data) {
    let head_end = data.indexOf("[##]");
    let timeout = Number(this.unpkgHead(2, data, true));
    let head = data.subarray(0, data.indexOf(proto[2]));
    let body = data.subarray(head_end + 4, data.length);
    let _body = this.unpacking(body);
    Promise.race([
      this.timeout(timeout),
      this.ArcEvent.emit(head, ..._body)
    ]).then((res) => {
      let toJson = JSON.stringify(res);
      this.socket.write(toJson, function(err) {
        if (err) {
          console.log("\u670D\u52A1\u7AEF\u5199\u5165\u9519\u8BEF", err);
        }
        console.log("\u670D\u52A1\u7AEF\u5199\u5165\u6210\u529F");
      });
    }).catch((err) => {
      this.socket.write(err, function(err2) {
        if (err2) {
          console.log("\u670D\u52A1\u7AEF\u5199\u5165\u9519\u8BEF", err2);
        }
        console.log("\u670D\u52A1\u7AEF\u5199\u5165\u6210\u529F");
      });
    });
  }
  error(err) {
    console.log("ado-rpc-err", err);
  }
  connection() {
    console.log("\u6709\u65B0\u7528\u6237\u94FE\u63A51");
  }
  unpacking(buf) {
    let args = [];
    let init = 0;
    let start = buf.indexOf(size[init]);
    while (true) {
      let end_str = buf.subarray(start, start + 3).toString();
      let isEnd = end_str == size[size.length - 1];
      if (isEnd) {
        break;
      }
      let next = buf.indexOf(size[init + 1], start);
      if (next == -1) {
        let sub_pkg = buf.subarray(start, start + 6).toString();
        let is_un_pkg = sub_pkg == size[init] + size[0];
        if (is_un_pkg) {
          let un_pkg = buf.subarray(start + 3, buf.length - 3);
          let getargs = this.unpacking(un_pkg);
          args[init] = getargs;
        } else {
          let un_pkg = buf.subarray(start + 3, buf.length - 3).toString();
          args[init] = un_pkg;
        }
        break;
      } else {
        let isObject2 = buf.subarray(start, start + 6).toString() == size[init] + size[0];
        if (isObject2) {
          let end = buf.indexOf(size[size.length - 1] + size[init + 1]);
          let un_pkg = buf.subarray(start + 3, end + 3);
          let getargs = this.unpacking(un_pkg);
          args[init] = getargs;
          start = end + 3;
        } else {
          let getargs = buf.subarray(start + 3, next).toString();
          args[init] = getargs;
          start = next;
        }
      }
      init++;
    }
    return args;
  }
  unpkgHead(start, data, end) {
    let start_index = data.indexOf(proto[start]);
    let start_next = 0;
    if (end) {
      start_next = data.indexOf(proto[proto.length - 1]);
    } else {
      start_next = data.indexOf(proto[start + 1]);
    }
    let timeout = data.subarray(start_index + proto[start].length, start_next).toString("utf-8");
    return timeout;
  }
  timeout(time) {
    return new Promise((_2, rej) => {
      let _time = setTimeout(() => {
        rej("\u8BF7\u6C42\u8D85\u65F6");
        clearTimeout(_time);
      }, time);
    });
  }
};

// lib/rpc/run.ts
var import_process2 = require("process");
var RpcServerModules = (opt) => {
  return function(target) {
    (async function() {
      await Connection.readConfig();
    })();
    function boost() {
      setImmediate(() => {
        const { RpcServerController: RpcServerController2, host, port } = opt;
        let events = RpcServerController2.map((item) => {
          const { name, prototype } = item;
          const event = ref.get(name, prototype, ":events");
          return event;
        });
        let server = new ArcServer({ host, port });
        server.registEvents(...events);
      });
    }
    ref.def(target.name, boost, target.prototype, ":boost");
  };
};
function RpcServerBoost(RpcServerClass) {
  const { name, prototype } = RpcServerClass;
  const boost = ref.get(name, prototype, ":boost");
  return boost;
}
var RpcClientModules = (_2) => {
  return function(_3) {
    const { name, prototype } = AdoNodeServer;
    function RpcClient(app) {
      let router = import_express2.default.Router();
      (0, import_process2.nextTick)(() => {
        console.log("RpcClientMap", RpcClientMap);
        for (let v in RpcClientMap) {
          RpcClientMap[v].forEach((el) => {
            let toarray = Object.entries(el)[0];
            router.post(toarray[0], toarray[1]);
          });
          app.use(v, router);
        }
      });
    }
    ref.def(name, RpcClient, prototype, ":rpc-client");
  };
};

// lib/rpc/index.ts
var size = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "-",
  "=",
  "/",
  ".",
  ","
].map((item) => {
  return "#" + item + "#";
});
var proto = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "#"
].map((item) => {
  return "[#" + item + "]";
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AdoNodeController,
  AdoNodeServer,
  AdoOrmBaseEntity,
  AdoOrmBaseView,
  All,
  AutoCreate,
  BeforeDelete,
  BeforeInsert,
  BeforeUpdate,
  Body,
  Call,
  ClientError,
  Collect,
  Controller,
  CreateView,
  DataBaseError,
  Entity,
  FieldError,
  GenereateRouter,
  Get,
  Headers,
  Index,
  Inject,
  IsEmail,
  IsNumber,
  IsOptional,
  Key,
  Keyword,
  Module,
  Modules,
  Params,
  Post,
  Query,
  Register,
  Req,
  Res,
  RpcClientController,
  RpcClientModules,
  RpcServerBoost,
  RpcServerController,
  RpcServerModules,
  SerivceMap,
  Timeout,
  TypesError,
  UseControllerInterceptor,
  UseInterceptor,
  UsePipe,
  View,
  class_transform,
  defineAdoNodeConfig,
  defineAdoNodeOptions,
  del,
  gerRedis,
  getConnection,
  query,
  ref,
  save,
  update,
  validate
});
