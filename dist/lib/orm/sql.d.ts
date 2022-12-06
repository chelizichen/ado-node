declare class query {
    sql: string;
    Enity: string;
    andsql: string;
    orsql: string;
    likesql: string;
    setEnity(Enity: Function | string): this;
    setColumn<T extends string[]>(keys: T): query;
    and<T extends string | Record<string, string>>(options: T, value?: T extends string ? T : any): this;
    or<T extends string | Record<string, string>>(options: T, value?: T extends string ? T : any): this;
    like(key: string, value: string, andor: "and" | "or"): this;
    pagination<T extends {
        page: number;
        size: number;
    } | number>(options: T, value: T extends number ? number : any): query;
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
