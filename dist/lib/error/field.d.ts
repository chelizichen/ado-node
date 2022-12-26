import { CODE, MESSAGE } from "../constant/constant";
declare class FieldError extends Error {
    name: string;
    code: CODE;
    message: string;
    constructor(message: string);
    static RetFieldError(message: string): {
        code: CODE;
        message: MESSAGE;
        data: FieldError;
    };
}
export { FieldError };
