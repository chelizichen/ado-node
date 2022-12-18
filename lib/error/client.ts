import { CODE, MESSAGE } from "../constant/constant";

// 客户端错误
class ClientError extends Error {
  public name = "ClientError";
  public code = CODE.ERROR;
  public message: string;
  constructor(message: string) {
    super(message);
    this.message = message;
  }
  static RetClientError(message: string) {
    const data = new ClientError(message);
    return {
      code: CODE.ERROR,
      message: MESSAGE.ERROR,
      data,
    };
  }
}

export { ClientError };
