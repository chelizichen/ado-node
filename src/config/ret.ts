export class Ret {
  static Message<T>(code: number, msg: string, data: T) {
    return {
      code,
      msg,
      data,
    };
  }
}
