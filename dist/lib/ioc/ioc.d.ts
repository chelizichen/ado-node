import "reflect-metadata";
/**
 * @description 在 Controller 层自动注入方法
 * @realize -- 在原型链上注入
 */
declare const Inject: (InjectTarget: Function) => PropertyDecorator;
declare const Collect: () => ClassDecorator;
export { Inject, Collect };
