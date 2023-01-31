import {  Request } from "express";
import { AdoNodeControllerInterceptor } from "./lib/interceptor/global";
import { AdoNodeInterceptor } from "./lib/interceptor/interceptor";
import { AdoNodePipe, AdoNodeGlobalPipe } from "./lib/pipe";
import { RpcClientRemote, RpcClientValue } from "./lib/rpc";

export type Query<T> = Request<any, any, any, T, any>;

export type Body<T> = Request<any, any, T, any, any>;


export type VoidFunction = (...args: any[]) => void;


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