import { ClassConstructor } from "../types";
declare const Config: ClassDecorator;
declare const AdoNodeConfig: (ConfigClass: ClassConstructor) => ClassDecorator;
declare const useConfig: <T extends unknown>() => T;
export { useConfig, Config, AdoNodeConfig };
