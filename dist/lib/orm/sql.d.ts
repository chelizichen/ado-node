declare class query {
    sql: string;
    Entity: string;
    and_sql: string;
    or_sql: string;
    likeand_sql: string;
    likeor_sql: string;
    pagination_sql: string;
    column_sql: string;
    setEntity(Entity: string[] | string): this;
    setColumn<T extends string[]>(keys: T): query;
    and<T extends string | Record<string, string>>(options: T, value?: T extends string ? T : any): this;
    or<T extends string | Record<string, string>>(options: T, value?: T extends string ? T : any): this;
    like_or<T extends string | Record<string, string>>(options: T, value?: T extends string ? T : any): this;
    like_and<T extends string | Record<string, string>>(options: T, value?: T extends string ? T : any): this;
    pagination(page: number, size: number): query;
    getSql(): string;
}
declare class del {
    sql: string;
    private Entity;
    private andsql;
    private orsql;
    setEntity(Entity: Function | string): this;
    and<T extends string | Record<string, string>>(options: T, value?: T extends string ? T : any): this;
    or<T extends string | Record<string, string>>(options: T, value?: T extends string ? T : any): this;
    getSql(): string;
}
declare class update {
    Entity: string;
    sql: string;
    options: Record<string, string>;
    orsql: string;
    andsql: string;
    setEntity(Entity: Function | string): this;
    setOptions<T extends Record<string, string> | string>(options: T, value?: T extends string ? string : any): this;
    or<T extends string | Record<string, string>>(options: T, value?: T extends string ? T : any): this;
    and<T extends string | Record<string, string>>(options: T, value?: T extends string ? T : any): this;
    getSql(): {
        opt: Record<string, string>[];
        sql: string;
    };
}
declare class save {
    sql: string;
    Entity: string;
    options: Record<string, string>;
    setEntity<T extends string | Function>(Entity: T): this;
    setOptions<T extends string | Record<string, string>>(options: T, value?: T extends string ? string : undefined): this;
    getSql(): {
        opt: Record<string, string>[];
        sql: string;
    };
}
export { query, del, update, save };
