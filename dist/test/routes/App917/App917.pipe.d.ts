import { Query } from "../../../lib/core";
export declare function useIdPipe(req: Query<{
    id: number;
}>): void;
export declare function userNamePipe(req: Query<{
    name: string;
}>): void;
