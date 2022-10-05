export declare class user {
    id: number;
    phone: number;
    username: string;
    password: string;
}
export declare class Ret {
    static Message<T>(code: number, msg: string, data: T): {
        code: number;
        msg: string;
        data: T;
    };
}
