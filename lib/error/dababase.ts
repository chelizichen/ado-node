import { CODE } from "../core";

// 数据库错误
export class DataBaseError extends Error {
  public name = "DataBaseError";
  public code = CODE.ERROR;
  public detail;
  constructor(message: string, detail: any) {
    super(message);
    this.detail = detail;
  }
}
