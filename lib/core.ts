import { CODE, MESSAGE, CONSTANT } from "./constant/constant";
/**
 * constant
 * 定义的常量
 */
export { CONSTANT, MESSAGE, CODE };
import { Error } from "./error/error";
import type { ErrorType } from "./error/error";
/**
 * error
 * 定义的错误装饰器
 */
export { Error };
export type { ErrorType };

/**
 * ioc
 *
 */
import { HandleController } from "./ioc/class";
import { Controller } from "./ioc/controller";
import { Inject, Collect } from "./ioc/ioc";
import { ref } from "./ioc/ref";
import { GenereateRouter, SerivceMap } from "./ioc/service";
export {
  HandleController,
  Controller,
  Inject,
  Collect,
  ref,
  GenereateRouter,
  SerivceMap,
};

import { Get, Post } from "./method/method";
import { createSSRServer, createServer, AdoNodeServer } from "./method/server";
export { Get, Post, createSSRServer, createServer, AdoNodeServer };

import { Curd } from "./oper/curd";
import type { ClassConstructor } from "./oper/curd";

export { Curd };
export type { ClassConstructor };

import { Pipe } from "./pipe/pipe";
export { Pipe };

import { AdoOrmBaseEnity } from "./orm/orm";
export { AdoOrmBaseEnity };

import { Config, AdoNodeConfig, useConfig } from "./store/config";
import { CreateCache, UseCache } from "./store/cache";
import { CreateDb } from "./store/db";
import { Enity, Key, Keyword } from "./store/enity";
import {
  Connect,
  Mapper,
  Select,
  Update,
  Delete,
  Insert,
} from "./store/mapper";

export {
  CreateCache,
  UseCache,
  CreateDb,
  Enity,
  Key,
  Keyword,
  Connect,
  Mapper,
  Select,
  Update,
  Delete,
  Insert,
  Config,
  AdoNodeConfig,
  useConfig,
};

import { Query, Body, HandleProxyOptions } from "./types";
export type { Query, Body, HandleProxyOptions };
