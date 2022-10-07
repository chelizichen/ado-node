export declare const CONSTANT: {
    Redis: string;
};
export declare enum CODE {
    CACHE = 10,
    SUCCESS = 0,
    ERROR = -1,
    FIELDERROR = -2,
    TYPEERROR = -3,
    NOTFOUND = -4
}
export declare enum MESSAGE {
    CACHE = "cache",
    SUCCESS = "success",
    ERROR = "error",
    FIELDERROR = "missing field",
    TypeError = "type error",
    NOTFOUND = "not found"
}
