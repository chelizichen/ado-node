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

export { Curd };

import { UsePipe } from "./pipe/pipe";
export { UsePipe };

import { AdoOrmBaseEnity } from "./orm/orm";
export { AdoOrmBaseEnity };

import { Config, AdoNodeConfig, useConfig } from "./store/config";
import { CreateCache, UseCache } from "./store/cache";
import { CreateDb } from "./store/db";
import {
  Enity,
  Key,
  Keyword,
  AutoCreate,
  EnityTable,
  IsEmail,
  IsNumber,
  IsOptional,
} from "./orm/enity";
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

export { IsEmail, IsOptional, IsNumber, EnityTable, AutoCreate };

import { Query, Body, HandleProxyOptions } from "./types";
import { ClientError } from "./error/client";
import { DataBaseError } from "./error/dababase";
import { FieldError } from "./error/field";
import { RestartServer } from "./error/restart";
import { ServerError } from "./error/server";
import { TypesError } from "./error/type";
export type { Query, Body, HandleProxyOptions };

export {
  ClientError,
  DataBaseError,
  FieldError,
  RestartServer,
  ServerError,
  TypesError,
};
