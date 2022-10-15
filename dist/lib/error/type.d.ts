import { CODE, MESSAGE } from "../core";
declare class TypesError extends Error {
    name: string;
    code: CODE;
    message: string;
    constructor(message: string);
    static RetTypeError(message: string): {
        code: CODE;
        message: MESSAGE;
        data: TypesError;
    };
}
export { TypesError };