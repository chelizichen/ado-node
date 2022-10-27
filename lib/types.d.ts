import { IRouter, Request } from "express";
import { AdoNodeController } from "./ioc/class";
import { ClassConstructor } from "./oper/curd";
import { AdoNodeGlobalPipe, AdoNodePipe } from "./pipe/pipe";
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

export type AdoModuleOptions = {
  Controller: BaseController[];
  Provider: any[];
};

export type AdoModulesOptions = {
  Modules: any[];
  GlobalPipes: any[];
  Base: "/api";
  Port: 3000;
  Cluster?: boolean;
};

export type AppServer = (Options: ServerOptions) => void;

export type VoidFunction = (...args: any[]) => void;

export type { ClassConstructor };

export type { AdoNodePipe, AdoNodeGlobalPipe };
