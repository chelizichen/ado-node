/**
 * @Mapper 数据库操作层
 * @Connect 数据库链接
 * @Select 用于提示sql
 */
declare class App917Mapper {
    userList(_options: any): Promise<void>;
    update(): Promise<void>;
}
export { App917Mapper };
