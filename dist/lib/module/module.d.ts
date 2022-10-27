import { AdoModuleOptions, AdoModulesOptions } from "../types";
declare const Module: (AdoNodeOptions: AdoModuleOptions) => ClassDecorator;
declare const Modules: (modules: AdoModulesOptions) => ClassDecorator;
export { Module, Modules };
