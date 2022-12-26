import { AdoModuleOptions, AdoModulesOptions } from "../../index.d";
declare const Module: (AdoNodeOptions: AdoModuleOptions) => ClassDecorator;
declare const Modules: (modules: AdoModulesOptions) => ClassDecorator;
export { Module, Modules };
