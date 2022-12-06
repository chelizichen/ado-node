import { IRouter, Request } from "express";
import { AdoNodeController } from "./ioc/class";
import { AdoNodeGlobalPipe, AdoNodePipe } from "./pipe/pipe";
export type Query<T> = Request<any, any, any, T, any>;
export type Body<T> = Request<any, any, T, any, any>;
export type AdoNodeControllerType = typeof AdoNodeController;
export type ServerOptions = {
  controller: Array<IRouter>;
  base: string;
};

export type AdoNodeOptions = {
  controller: Array<AdoNodeControllerType>;
  base: string;
  port: number;
  staticDist: string;
  globalPipes?: any[];
  cluster?: boolean;
};

export type AdoModuleOptions = {
  Controller: AdoNodeControllerType[];
  Provider: any[];
};

export type AdoModulesOptions = {
  Modules: any[];
  GlobalPipes: any[];
  Base: string;
  Port: number;
  Cluster?: boolean;
};

export type AppServer = (Options: ServerOptions) => void;

export type VoidFunction = (...args: any[]) => void;


export type { AdoNodePipe, AdoNodeGlobalPipe };
