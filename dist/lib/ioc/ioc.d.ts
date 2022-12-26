/**
 * @Author chelizichen
 * @description  DI 的 实现
 */
import "reflect-metadata";
declare const Inject: (InjectTarget: Function) => PropertyDecorator;
declare const Collect: () => ClassDecorator;
export { Inject, Collect };
