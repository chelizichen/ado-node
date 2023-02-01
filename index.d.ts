import {  Request } from "express";
import { AdoNodeControllerInterceptor } from "./lib/interceptor/global";
import { AdoNodeInterceptor } from "./lib/interceptor/interceptor";
import { AdoNodePipe, AdoNodeGlobalPipe } from "./lib/pipe";
import { RpcClientRemote, RpcClientValue } from "./lib/rpc";

export type Query<T> = Request<any, any, any, T, any>;

export type Body<T> = Request<any, any, T, any, any>;


export type VoidFunction = (...args: any[]) => void;

type database = {
    default?:boolean;
    type: string;
    host: string ;
    username: string ;
    password: string ;
    database: string ; //所用数据库
    port: number;
    connectionLimit: number;
}

export type AdoNodeConfig = {
  database: database | database[];
  // Http服务配置
  server: {
    base: string;
    port: number;
    host: string;
    upload: string;
  };
  // 微服务配置
  microService: {
    port: string;
    host: string;
  };
};

export type { AdoNodePipe, AdoNodeGlobalPipe };

export type { AdoNodeInterceptor };
export type { AdoNodeControllerInterceptor };



export type RpcInterface = string;
export type RpcServerValue = any;
export type { RpcClientRemote, RpcClientValue };

export declare interface ArcInterFace {
  name: string;
  remote: string;
  description: string;
  server:{
      path:string;
  }
  client:{
      path:string;
      controller:string;
  }
}

export declare interface ArcMethod {
  [method:string]:{
      req:any,
      res:any
  }
}