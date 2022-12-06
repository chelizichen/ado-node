declare class query {
    sql: string;
    Enity: string;
    and_sql: string;
    or_sql: string;
    likeand_sql: string;
    likeor_sql: string;
    pagination_sql: string;
    column_sql: string;
    setEnity(Enity: string[] | string): this;
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
    private Enity;
    private andsql;
    private orsql;
    setEnity(Enity: Function | string): this;
    and<T extends string | Record<string, string>>(options: T, value?: T extends string ? T : any): this;
    or<T extends string | Record<string, string>>(options: T, value?: T extends string ? T : any): this;
    getSql(): string;
}
declare class update {
    Enity: string;
    sql: string;
    options: Record<string, string>;
    orsql: string;
    andsql: string;
    setEnity(Enity: Function | string): this;
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
    Enity: string;
    options: Record<string, string>;
    setEnity<T extends string | Function>(Enity: T): this;
    setOptions<T extends string | Record<string, string>>(options: T, value?: T extends string ? string : undefined): this;
    getSql(): {
        opt: Record<string, string>[];
        sql: string;
    };
}
export { query, del, update, save };
