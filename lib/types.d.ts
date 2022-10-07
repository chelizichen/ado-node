import { IRouter, Request } from "express";
import { HandleController } from "./ioc/class";
export type Query<T> = Request<any, any, any, T, any>;
export type Body<T> = Request<any, any, T, any, any>;
type BaseController = typeof HandleController;
export type ServerOptions = {
  controller: Array<IRouter>;
  base: string;
};
export type HandleProxyOptions = {
  controller: Array<BaseController>;
  base: string;
  port: number;
  staticDist: string;
};
export type AppServer = (Options: ServerOptions) => void;
