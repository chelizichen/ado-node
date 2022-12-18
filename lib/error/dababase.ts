import { CODE } from "../constant/constant";

// 数据库错误
class DataBaseError extends Error {
  public name = "DataBaseError";
  public code = CODE.ERROR;
  public detail;
  constructor(message: string, detail: any) {
    super(message);
    this.detail = detail;
  }
}

export { DataBaseError };
