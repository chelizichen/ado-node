export declare type ErrorType<E = string, Code = number> = {
    message: E;
    code?: Code;
    force?: boolean;
};
declare const Error: (e: ErrorType) => MethodDecorator;
export { Error };
