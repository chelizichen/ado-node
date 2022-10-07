import "reflect-metadata";
/**
 * @description 在 Controller 层自动注入方法
 * @realize -- 在原型链上注入
 */
export declare const Inject: (InjectTarget: Function) => PropertyDecorator;
export declare const Collect: () => ClassDecorator;
