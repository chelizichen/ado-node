import { Inject } from "./handle.inject";
import { Collect } from "./handle.inject";
import { Controller } from "./handle.controller";
import { Get } from "./handle.method";
import { Post } from "./handle.method";
import { Query } from "./types";
import { Body } from "./types";
import { HandleController } from "./handle.class";
import { ServerOptions } from "./types";
import Service from "./handle.service";
import { AppServer } from "./types";
import { GenereateRouter } from "./handle.service";
import { Error } from "./handle.error";

export {
  Inject,
  Controller,
  Collect,
  Get,
  Post,
  HandleController,
  Service,
  GenereateRouter,
  Error,
};

export type { Query, Body, ServerOptions, AppServer };
