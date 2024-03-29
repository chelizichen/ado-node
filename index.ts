
import { DataBaseError, ClientError, FieldError, TypesError } from "./lib/error";
import { UseControllerInterceptor } from "./lib/interceptor/global";
import { UseInterceptor } from "./lib/interceptor/interceptor";
import { AdoNodeController, Controller, Inject, Collect, ref, SerivceMap, GenereateRouter } from "./lib/ioc";
import { AdoNodeServer, All, defineAdoNodeOptions, Get, Post } from "./lib/method";
import { Module, Modules } from "./lib/module";
import { BeforeInsert, BeforeDelete, BeforeUpdate, AdoOrmBaseEntity, AutoCreate, del, Entity, IsEmail, IsNumber, IsOptional, Key, Keyword, query, save, update, AdoOrmBaseView, CreateView, Index, View } from "./lib/orm";
import { getConnection, getRedis, defineAdoNodeConfig, PromiseQuery } from "./lib/orm/conn";
import { Req, Res, Params,Headers,Query,Body } from "./lib/params";
import { class_transform, UsePipe, validate } from "./lib/pipe";
import { ArcClient, ArcEvent, Call, Register, RpcClientController, RpcClientModules, RpcServerBoost, RpcServerController, RpcServerModules, Timeout } from "./lib/rpc";


export { DataBaseError };
export { ClientError };
export { FieldError };
export { TypesError };



export { UseControllerInterceptor };
export { UseInterceptor };

export { AdoNodeController };
export { Controller };
export { Inject, Collect };
export { ref };
export { SerivceMap, GenereateRouter };


export { Get, Post, All };
export { AdoNodeServer, defineAdoNodeOptions };



export { Module, Modules };


export {
  Entity,
  Key,
  Keyword,
  IsEmail,
  IsOptional,
  IsNumber,
  AutoCreate,
  Index,
};

export { BeforeInsert, BeforeDelete, BeforeUpdate };

export { AdoOrmBaseEntity, AdoOrmBaseView };

export { query, del, update, save };

export { getConnection, getRedis, defineAdoNodeConfig, PromiseQuery };

export { View, CreateView };




export { Query, Body, Headers, Req, Res, Params };

export { UsePipe, validate };
export { class_transform };


// rpc
export { RpcClientController, RpcServerController };
export { RpcServerModules, RpcClientModules, RpcServerBoost };
export {
  ArcEvent
}
export { ArcClient };
export { Call, Register, Timeout };