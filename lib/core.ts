import { MESSAGE, CODE, CONSTANT } from "./constant/constant";
import { ClientError } from "./error/client";
import { Error } from "./error/error";
import { DataBaseError } from "./error/dababase";
import { FieldError } from "./error/field";
import { TypesError } from "./error/type";
import { getStrCount } from "./oper/protect";
import {
  IsEmail,
  IsOptional,
  IsNumber,
  EnityTable,
  AutoCreate,
  Enity,
  Key,
  Keyword,
} from "./orm/enity";
import { del, query } from "./orm/sql";
import { AdoNodeController } from "./ioc/class";
import { Controller } from "./ioc/controller";
import { Collect, Inject } from "./ioc/ioc";
import { ref } from "./ioc/ref";
import { AdoNodeServer } from "./method/server";
import { Get, Post } from "./method/method";
import { GenereateRouter, SerivceMap } from "./ioc/service";
import { UsePipe, validate } from "./pipe/pipe";
import { AdoOrmBaseEnity } from "./orm/orm";

// constant
export { MESSAGE, CONSTANT, CODE };

// error
export { ClientError };
export { DataBaseError };
export { FieldError };
export { Error };
export { TypesError };

// ioc
export { AdoNodeController };
export { Controller };
export { Inject, Collect };
export { ref };
export { SerivceMap, GenereateRouter };

// method
export { Get, Post };
export { AdoNodeServer };



// protect
export { getStrCount };

// orm
// enity
export {
  Enity,
  Key,
  Keyword,
  IsEmail,
  IsOptional,
  IsNumber,
  EnityTable,
  AutoCreate,
};
// orm
export { AdoOrmBaseEnity };
// async

// sql
export { query, del };

// pipe
export { UsePipe, validate };




