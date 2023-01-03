export function getStrCount<T extends string | string[]>(
  aStr: string,
  aChar: T
) {
  let result: any;
  let count = 0;
  if (typeof aChar === "string") {
    let regex = new RegExp(aChar, "g");
    result = aStr.match(regex);
    count = !result ? 0 : result.length;
  }
  if (aChar instanceof Array) {
    aChar.forEach((el) => {
      let regex = new RegExp(el, "g");
      result = aStr.match(regex);
      result = !result ? 0 : result.length;
      count += result;
    });
  }
  return count;
}
