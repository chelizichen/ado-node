export declare type ErrorType<E = string, Code = number> = {
    message: E;
    code?: Code;
    force?: boolean;
};
export declare const Error: (e: ErrorType) => MethodDecorator;
