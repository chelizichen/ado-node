import { IRouter, Request } from "express";
import { AdoNodeController } from "./index";
import { AdoNodeControllerInterceptor } from "./lib/interceptor/global";
import { AdoNodeInterceptor } from "./lib/interceptor/interceptor";
import { AdoNodePipe, AdoNodeGlobalPipe } from "./lib/pipe";
import { RpcClientRemote, RpcClientValue } from "./lib/rpc";

export type Query<T> = Request<any, any, any, T, any>;

export type Body<T> = Request<any, any, T, any, any>;

export type BaseController = typeof AdoNodeController;

export type ServerOptions = {
  controller: Array<IRouter>;
  base: string;
};
export type AdoNodeOptions = {
  controller: Array<BaseController>;
  base: string;
  port: number;
  staticDist: string;
  globalPipes?: any[];
  cluster?: boolean;
};
export type AppServer = (Options: ServerOptions) => void;

export type VoidFunction = (...args: any[]) => void;


export type { AdoNodePipe, AdoNodeGlobalPipe };

export type { AdoNodeInterceptor };
export type { AdoNodeControllerInterceptor };

export type AdoModuleOptions = {
  Controller: BaseController[];
  Provider: any[];
};

export type AdoModulesOptions = {
  Modules: any[];
  GlobalPipes: any[];
  Cluster?: boolean;
};

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