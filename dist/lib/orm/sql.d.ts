declare class query {
    sql: string;
    Enity: string;
    andsql: string;
    orsql: string;
    setEnity(Enity: Function): this;
    setColumn<T extends string[]>(keys: T): query;
    and<T extends string | Record<string, string>>(options: T, value?: T extends string ? T : any): this;
    or<T extends string | Record<string, string>>(options: T, value?: T extends string ? T : any): this;
    pagination<T extends {
        page: number;
        size: number;
    } | number>(options: T, value: T extends number ? number : any): query;
    getMany(): string;
}
declare class del {
    sql: string;
    private Enity;
    private andsql;
    private orsql;
    setEnity(Enity: Function): this;
    and<T extends string | Record<string, string>>(options: T, value?: T extends string ? T : any): this;
    or<T extends string | Record<string, string>>(options: T, value?: T extends string ? T : any): this;
    getMany(): string;
}
export { query, del };
