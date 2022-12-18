import { CODE,MESSAGE } from "../constant/constant";

class TypesError extends Error {
  public name = "TypeError";
  public code = CODE.TYPEERROR;
  public message: string;
  constructor(message: string) {
    super(message);
    this.message = message;
  }
  static RetTypeError(message: string) {
    const data = new TypesError(message);
    return {
      code: CODE.TYPEERROR,
      message: MESSAGE.TypeError,
      data: data,
    };
  }
}
export { TypesError };
