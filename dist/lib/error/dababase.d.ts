import { CODE } from "../core";
declare class DataBaseError extends Error {
    name: string;
    code: CODE;
    detail: any;
    constructor(message: string, detail: any);
}
export { DataBaseError };
