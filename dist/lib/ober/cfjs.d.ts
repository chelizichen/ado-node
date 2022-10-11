/**
 * .then .then .then .then .then
 * store ( Array<fn> )
 * add( fn:callback , weight:number )
 */
import { VoidFunction } from "../types";
export declare function useCffn(fn: VoidFunction, weight: number): void;
export declare function useRunCf(): void;
export declare class cfjs {
    static store: Array<{
        fn: VoidFunction;
        weight: number;
    }>;
    static add(fn: VoidFunction, weight: number): void;
    static sort(): void;
    static run(): void;
}
