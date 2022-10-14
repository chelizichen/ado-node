import { CODE, MESSAGE } from "../core";

export class FieldError extends Error {
  public name = "FieldError";
  public code = CODE.FIELDERROR;
  public message: string;
  constructor(message: string) {
    super(message);
    this.message = message;
  }
  static RetFieldError(message: string) {
    const data = new FieldError(message);
    return {
      code: CODE.FIELDERROR,
      message: MESSAGE.FIELDERROR,
      data,
    };
  }
}
