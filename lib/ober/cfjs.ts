/**
 * .then .then .then .then .then
 * store ( Array<fn> )
 * add( fn:callback , weight:number )
 */

// 配置项 为 1 - 10
// 使用配置项为 10 - 100
// 运行 100 - 999
import { VoidFunction } from "../types";
function useCffn(fn: VoidFunction, weight: number) {
  cfjs.add(fn, weight);
}

function useRunCf() {
  cfjs.run();
}

class cfjs {
  public static store: Array<{
    fn: VoidFunction;
    weight: number;
  }> = [];

  public static add(fn: VoidFunction, weight: number) {
    cfjs.store.push({ fn, weight });
  }

  public static sort() {
    cfjs.store.sort((a, b) => {
      return a.weight - b.weight;
    });
  }

  public static run() {
    cfjs.sort();
    cfjs.store.forEach((el) => {
      el.fn();
    });
  }
}

export { useCffn, useRunCf, cfjs };
