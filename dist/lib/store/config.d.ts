import { ClassConstructor } from "../core";
export declare const Config: ClassDecorator;
export declare const AdoNodeConfig: (ConfigClass: ClassConstructor) => ClassDecorator;
export declare const useConfig: <T extends unknown>() => T;
