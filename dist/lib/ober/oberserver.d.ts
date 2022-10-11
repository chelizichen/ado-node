export declare class OberServer {
    store: {
        key: string;
        value: any;
    }[];
    set(key: string, value: any): void;
    get(key: string): {
        key: string;
        value: any;
    } | undefined;
}
