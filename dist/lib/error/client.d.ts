import { CODE, MESSAGE } from "../core";
declare class ClientError extends Error {
    name: string;
    code: CODE;
    message: string;
    constructor(message: string);
    static RetClientError(message: string): {
        code: CODE;
        message: MESSAGE;
        data: ClientError;
    };
}
export { ClientError };
