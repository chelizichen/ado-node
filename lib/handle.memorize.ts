export function memorize(fn: Function) {
  const cache: Record<any, any> = {};
  return (...args: any) => {
    const key = JSON.stringify(args);
    if (!cache[key]) {
      cache[key] = fn(...args);
    }
    return cache[key];
  };
}

export function memorizeDto(key: string, inst: () => any) {
  const cache: Record<any, any> = {};
  return () => {
    if (!cache[key]) {
      cache[key] = inst();
    }
    return cache[key];
  };
}
