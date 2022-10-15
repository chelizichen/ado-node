/**
 * .then .then .then .then .then
 * store ( Array<fn> )
 * add( fn:callback , weight:number )
 */
import { VoidFunction } from "../types";
declare function useCffn(fn: VoidFunction, weight: number): void;
declare function useRunCf(): void;
declare class cfjs {
    static store: Array<{
        fn: VoidFunction;
        weight: number;
    }>;
    static add(fn: VoidFunction, weight: number): void;
    static sort(): void;
    static run(): void;
}
export { useCffn, useRunCf, cfjs };
